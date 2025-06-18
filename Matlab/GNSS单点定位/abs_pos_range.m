function StationCoord=abs_pos_range(pointID,ApproCoord)
%absolute positioning using pesudo-range
% 25/8/2006
%Inputs:
%       pointID:the index of the point will be positioned  %%  默认1
%       
%    ApproCoord:the approximate coordinate of station
%Output:
%   StationCoord: the coordinate of station

global  HeadODat SiteDat  % Site
%判断伪距观测值类型
ISC1=false;   %是否有C1观测值
ISP1=false;   %是否有P1观测值
ISP2=false;   %是否有P2观测值

for i=1:HeadODat(pointID).SumOType
    if (HeadODat(pointID).TypeOO(i)==2)      % 0-L1;1-L2;2-C1;3-P1;4-P2;5-D1;6-D2;
        ISC1=true;
    elseif (HeadODat(pointID).TypeOO(i)==3)
        ISP1=true;
    elseif(HeadODat(pointID).TypeOO(i)==4)
        ISP2=true;
    end
end

TempDat=SiteDat(pointID).ObsDat;  %将第pointID测站数据赋予临时变量

%%%%%%%%%%%将计算所用数据存入变量ComValue%%%%%%%%%%%%%%%%
if(ISP1 && ISP2) %如果同时有P1和P2，则采用线性组合
    for i=1:length(TempDat)
        Com(i).Value=TempDat(i).RangeC1;
    end 
elseif (ISC1)  %如果没有P1有C1观测值,采用C/A码
    for i=1:length(TempDat)
        Com(i).Value=TempDat(i).RangeC1;
    end
elseif(ISP1)
    for i=1:length(TempDat)
        Com(i).Value=TempDat(i).RangeP1;
    end
elseif(ISP2)
    for i=1:length(TempDat)
        Com(i).Value=TempDat(i).RangeP2;
    end
end

%%%%%%%%%%%%用伪距单点定位%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
LightSpeed=299792458.0;
Index=0;   
for i=1:length(TempDat)
  
    Used=TempDat(i).SatSum;       %认为该历元的卫星全部可用
    Used=Used-length(find(Com(i).Value==0));  %有效的观测值
    if(Used<4) 
        continue;
    end
    
    Res.X=10.0;Res.Y=10.0;Res.Z=10.0; %赋初值
    while(abs(Res.X)>1||abs(Res.Y)>1||abs(Res.Z)>1)
        for j=1:TempDat(i).SatSum
      
            Tmpcoord=Iter_Satcoord(TempDat(i).SatCode(j),ApproCoord,TempDat(i).TimeOEpp(1));  
            Tmpcoord.X=Tmpcoord.X-ApproCoord.X;
            Tmpcoord.Y=Tmpcoord.Y-ApproCoord.Y;
            Tmpcoord.Z=Tmpcoord.Z-ApproCoord.Z;
            Range=sqrt(Tmpcoord.X^2+Tmpcoord.Y^2+Tmpcoord.Z^2); 
            
            if (Com(i).Value(j)~=0)
                ConstL(j,1)=Range-Tmpcoord.clock_detat*LightSpeed-Com(i).Value(j);
                CoeA(j,1:3)=[Tmpcoord.X Tmpcoord.Y Tmpcoord.Z]/Range;
                CoeA(j,4)=-1.0; 
            else  
                CoeA(j,1:4)=0.0; 
            end
        end
        %形成法方程并求解
        ATPA=CoeA'*CoeA;
        ATPL=CoeA'*ConstL;
        
        InvATPA=inv(ATPA);
        TTT=InvATPA*ATPL;
        Res.X=TTT(1);Res.Y=TTT(2);Res.Z=TTT(3);
        Res.clock_deta=TTT(4);
        VV=CoeA*TTT-ConstL;
        sigma=sqrt(VV'*VV/(length(VV)-4));
        %更新近似坐标
        ApproCoord.X=ApproCoord.X+Res.X;
        ApproCoord.Y=ApproCoord.Y+Res.Y;
        ApproCoord.Z=ApproCoord.Z+Res.Z;
    end
    
    Index=Index+1
    ApproCoord
    
    Res_All(Index).X=ApproCoord.X;  %纪录该历元计算结果
    Res_All(Index).Y=ApproCoord.Y;
    Res_All(Index).Z=ApproCoord.Z; 
    Sig(Index)=sigma;
    QQ(Index,1:3)=diag(InvATPA(1:3,1:3))';
end

SationCoord.X=0;SationCoord.Y=0;SationCoord.Z=0;
Sum=length(Res_All);
Qsum=sum(QQ);
for i=1:Sum  %求平均
    SationCoord.X=SationCoord.X+Res_All(i).X*QQ(i,1)/Qsum(1);
    SationCoord.Y=SationCoord.Y+Res_All(i).Y*QQ(i,2)/Qsum(2);
    SationCoord.Z=SationCoord.Z+Res_All(i).Z*QQ(i,3)/Qsum(3);
end
%  SationCoord    %%%%% 20120417
return
