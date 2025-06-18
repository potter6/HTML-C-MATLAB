function EphDat = Read_N_Renix(filename)

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Open and Find the document in Windows method 
%[filename1,pathname1]=uigetfile('*.*N','读取卫星的星历数据 ');        
%fp=fopen(strcat(pathname1,filename1),'rt');
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Read the N-file with the renix format
%Input:
%        filename: the name of file including the file path
%Output: 
%        EphDat: a structure, storing the ephemeris
%	      .SatPRN;    //the Sat code
% 	      .toc;       //gpsweeksec
%         .MJDTime;   //Or GPS Time(只要统一时间系统即可，此处是改进儒略日时间系统)
% 	      .a0;        //different of the sat clock(second)
% 	      .a1;        //sat clock drift  (s/s)
% 	      .a2;        //the rate of the Sat clock drift(s/s^2)
% 	      .IODE;      //星历数据有效期IODE=Toe -Tl;
% 	      .Crs;       //轨道半径正弦调和改正项振幅(m)
% 	      .DetaN;     //平均运动修正量
% 	      .M0;        //Toe时的平近点角
% 	      .Cuc;       //纬度幅角余弦调和改正项振幅
% 	      .e;         //卫星轨道扁心率
% 	      .Cus;       //纬度幅角正弦调和改正项振幅
% 	      .sqrtA;     //卫星轨道长半径方根
% 	      .Toe;       //星历参考时间
% 	      .Cic;       //轨道倾角余弦调和改正项振幅
% 	      .OMG0;      //升交点赤经
% 	      .Cis;       //轨道倾角正弦调和改正项振幅
% 	      .I0;        //轨道倾角
% 	      .Crc;       //轨道半径余弦调和改正项振幅(m)
%         .omg;       //近地点角距
% 	      .OMG0dot;   //升交点赤经变化率
% 	      .I0dot;     //轨道倾角变化率
% 	      .ISL2;      //L2 数据标志
% 	      .GpsWn;     //GPS week number
% 	      .ISL2P;     //L2 P 数据标志
%         .SatAccu;   //The accuracy of the satellite(m)
% 	      .SatHth;    //The health of the Satellite (MSB)
% 	      .Tgd;       //单频接收机延迟改正数
% 	      .IODC;      //时钟数据有效期

%%%%%%%%%调用例如：    Read_N_Renix('D:\MATLAB6p5\work\75030891.10n')
%%%%%%%%%调用例如：  或     EphDat=Read_N_Renix('D:\MATLAB6p5\work\75030891.10n')
%%%%%%%%%调用例如：    EphDat(1).toc


%Begin program
fp=fopen('C:\Users\liujunwu.LIUJUNWU\Desktop\liujunwu\1\daima\75030891.10n','r');
if(fp==-1)
    error('error to open the '+ filename);
end

%read the file header
while (1) 
    strTemp=fgets(fp);
    if(strTemp==-1)
        error('error in the header file of '+ filename);
    end
    if(length(strTemp)<73)
        strTemp(length(strTemp)+1:73)='X';
    end
    if(strTemp(61:73)=='END OF HEADER')
        break;
    end
end

%read the N file data
%read the first epoch

strTemp=fgets(fp);
EphDat(1).SatPRN=str2num(strTemp(1:2));
Year=str2num(strTemp(4:5));Mon=str2num(strTemp(7:8));
Day=str2num(strTemp(10:11));THour=str2num(strTemp(13:14));
TMin=str2num(strTemp(16:17));TSec=str2num(strTemp(19:22));

if (Year>80)  %GPS从20C80年代上商用
    Year=Year+1900;
else
   Year=Year+2000;
end  
EphDat(1).toc=ConvertGpsTime(Year,Mon,Day,THour,TMin,TSec);             %转换成GPS周秒
EphDat(1).MJDTime=Time_MJD(Year,Mon,Day,THour,TMin,TSec);               %% 20101110增加

EphDat(1).a0=str2num(strTemp(23:41));      %D,E需要转化。。。。。。。。。。
EphDat(1).a1=str2num(strTemp(42:60));
EphDat(1).a2=str2num(strTemp(61:79));

strTemp=fgets(fp);;     %read the second line
EphDat(1).IODE=str2num(strTemp(1:22));
EphDat(1).Crs=str2num(strTemp(23:41));
EphDat(1).DetaN=str2num(strTemp(42:60));
EphDat(1).M0=str2num(strTemp(61:79));

strTemp=fgets(fp);     %read the third line 
EphDat(1).Cuc=str2num(strTemp(1:22));
EphDat(1).e=str2num(strTemp(23:41));
EphDat(1).Cus=str2num(strTemp(42:60));
EphDat(1).sqrtA=str2num(strTemp(61:79));

strTemp=fgets(fp);    %read the fourth line
EphDat(1).Toe=str2num(strTemp(1:22));
EphDat(1).Cic=str2num(strTemp(23:41));
EphDat(1).OMG0=str2num(strTemp(42:60));
EphDat(1).Cis=str2num(strTemp(61:79));

strTemp=fgets(fp);   %read the fifth line 
EphDat(1).I0=str2num(strTemp(1:22));
EphDat(1).Crc=str2num(strTemp(23:41));
EphDat(1).omg=str2num(strTemp(42:60));
EphDat(1).OMG0dot=str2num(strTemp(61:79));

strTemp=fgets(fp);   %read the sixth line 
EphDat(1).I0dot=str2num(strTemp(1:22));
EphDat(1).ISL2=str2num(strTemp(23:41));
EphDat(1).GpsWn=str2num(strTemp(42:60));
EphDat(1).ISL2P=str2num(strTemp(61:79));

strTemp=fgets(fp);   %the seventh line
EphDat(1).SatAccu=str2num(strTemp(1:22));
EphDat(1).SatHth=str2num(strTemp(23:41));
EphDat(1).Tgd=str2num(strTemp(42:60));
EphDat(1).IODC=str2num(strTemp(61:79));  

strTemp=fgets(fp); %the eigth line

%read the other epochs
while(1)
    strTemp=fgets(fp);
    if(strTemp==-1)
        break;
    end

    TempEph.SatPRN=str2num(strTemp(1:2));
    Year=str2num(strTemp(4:5));Mon=str2num(strTemp(7:8));
    Day=str2num(strTemp(10:11));THour=str2num(strTemp(13:14));
    TMin=str2num(strTemp(16:17));TSec=str2num(strTemp(19:22));
    
    if (Year>80)  %GPS从20C80年代上商用
        Year=Year+1900;
    else
        Year=Year+2000;
    end  
    TempEph.toc=ConvertGpsTime(Year,Mon,Day,THour,TMin,TSec);
    TempEph.MJDTime=Time_MJD(Year,Mon,Day,THour,TMin,TSec);         %% 20101110增加
    
    %判断是否有新的星历出现，如果没有则增加
    Increase=true;
    for i=1:length(EphDat)
        if(EphDat(i).SatPRN==TempEph.SatPRN)
            if(abs(TempEph.toc-EphDat(i).toc)<3600)
                Increase=false;
                break;
            end
        end
    end
    if(~Increase)
        for i=1:7  %读入剩余的7行
            fgets(fp);
        end
        continue;  % the next eph
    end
    
    TempEph.a0=str2num(strTemp(23:41));
    TempEph.a1=str2num(strTemp(42:60));
    TempEph.a2=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);;     %read the second line
    TempEph.IODE=str2num(strTemp(1:22));
    TempEph.Crs=str2num(strTemp(23:41));
    TempEph.DetaN=str2num(strTemp(42:60));
    TempEph.M0=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);     %read the third line 
    TempEph.Cuc=str2num(strTemp(1:22));
    TempEph.e=str2num(strTemp(23:41));
    TempEph.Cus=str2num(strTemp(42:60));
    TempEph.sqrtA=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);    %read the fourth line
    TempEph.Toe=str2num(strTemp(1:22));
    TempEph.Cic=str2num(strTemp(23:41));
    TempEph.OMG0=str2num(strTemp(42:60));
    TempEph.Cis=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);   %read the fifth line 
    TempEph.I0=str2num(strTemp(1:22));
    TempEph.Crc=str2num(strTemp(23:41));
    TempEph.omg=str2num(strTemp(42:60));
    TempEph.OMG0dot=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);   %read the sixth line 
    TempEph.I0dot=str2num(strTemp(1:22));
    TempEph.ISL2=str2num(strTemp(23:41));
    TempEph.GpsWn=str2num(strTemp(42:60));
    TempEph.ISL2P=str2num(strTemp(61:79));
    
    strTemp=fgets(fp);   %the seventh line
    TempEph.SatAccu=str2num(strTemp(1:22));
    TempEph.SatHth=str2num(strTemp(23:41));
    TempEph.Tgd=str2num(strTemp(42:60));
    TempEph.IODC=str2num(strTemp(61:79));  
    
    strTemp=fgets(fp); %the eigth line
    
    num_eph=length(EphDat)+1;
    EphDat(num_eph)=TempEph;
end

fclose(fp);
return;