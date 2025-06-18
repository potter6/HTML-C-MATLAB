function SatCoord=Pos_Sat(rpn,pos_time)
%compute the position of satellite at the pos_time
%according to the Kepler motion law
%written  25/8/2006

%inputs: 
%        rpn:     the code of satellite
%       pos_time: the time 
%Output:
%       SatCoord:  satellite 3D position X，Y，Z;   The unit is Meter
%       ClockError:satellite clock error;           The unit is Second

global EphDat         % EphDat是在Read_N_Renix()函数的结构体变量;

GM=3.986004418e+14;   %%地球引力场常数
omgedot=7.292115e-5;  %%地球自转速度（弧度每秒）

Enum=length(EphDat);   %总观测卫星的总数，It's no the number of Epoch

for i=1:Enum     %搜索是否有要计算的卫星的星历文件
    if (EphDat(i).SatPRN==rpn)  %若搜索到记下该卫星的下标
        sub=i;
        dt=abs(pos_time-EphDat(i).MJDTime);
        for j=i+1:Enum
            %找卫星号相同且时间与所求时间比较接近的历元
            %if ((EphDat(i).SatPRN==rpn) && (abs(pos_time-EphDat(i).MJDTime)<dt))  
            if ((EphDat(j).SatPRN==rpn) && (abs(pos_time-EphDat(j).MJDTime)<dt)) %%   2010年11月10日修正
                dt=abs(pos_time-EphDat(j).MJDTime);
                sub=j;
            end
        end
        break;
    end
end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%计算卫星三维坐标 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

Aa=EphDat(sub).sqrtA^2;              %地球长半径
n=sqrt(GM/Aa^3)+EphDat(sub).DetaN;   %改正后的平均角速度     （1）

tk=((pos_time-44244)-(fix((pos_time-44244)/7))*7)*3600*24-EphDat(sub).Toe;   %规划时刻   （2）  
%计算从需要时刻pos_time到参考时刻Toe的时间差
%去掉GPS周，先规划到GPS周秒
%注意Toe(单位是秒)使用的时间是GPS Week+Seconds.
%GPS标准历元1980.1.6的改进儒略日为44244

if (tk<-302400)
    tk=tk+604800;
elseif(tk>302400)
    tk=tk-604800;
end
    
Mk=EphDat(sub).M0+n*tk;              %平近点角   （3）
Ek1=Mk;    	                         %%%%%%%%%%%%% 叠代计算Ek,Ek初值为Mk %%%%%%%%%%
Ek0=0.0;
while (abs(Ek1-Ek0)>1.0e-12)         %偏近点角Ek，迭代解
    
    Ek0=Ek1;
    Ek1=Mk+EphDat(sub).e*sin(Ek0);
end
Ek=Ek1;                              %偏近点角   （4）

vk=2*atan(sqrt((1.0+EphDat(sub).e)/(1-EphDat(sub).e))*tan(Ek/2)); %利用半角公式计算，——真近点角  （5）
uk=vk+EphDat(sub).omg;               %升交角距，升交点与卫星的夹角    （6）
detauk=EphDat(sub).Cuc*cos(2*uk)+EphDat(sub).Cus*sin(2*uk);   %升交角距二阶摄动   （7）
detark=EphDat(sub).Crc*cos(2*uk)+EphDat(sub).Crs*sin(2*uk);   %地心向径二阶摄动   （7）
detaik=EphDat(sub).Cic*cos(2*uk)+EphDat(sub).Cis*sin(2*uk);   %倾角二阶摄动       （7）

u=uk+detauk;                             %改正后的升交角距   （8）
r=Aa*(1-EphDat(sub).e*cos(Ek))+detark;   %改正后的地心向径   （8）
ii=EphDat(sub).I0+detaik+EphDat(sub).I0dot*tk;   %改正后的轨道倾角 （8）


%%卫星轨道平面坐标   （9）
x=r*cos(u);
y=r*sin(u);

%改正升交点的经度(从春分点vemal equinox改正到格林威治点Greenwich)
OMG=EphDat(sub).OMG0+(EphDat(sub).OMG0dot-omgedot)*tk-omgedot*EphDat(sub).Toe;   %观测瞬间升交点的经度值

%卫星在地固系里的坐标  （10）
SatCoord.X=(x*cos(OMG)-y*cos(ii)*sin(OMG));
SatCoord.Y=(x*sin(OMG)+y*cos(ii)*cos(OMG));
SatCoord.Z=(y*sin(ii));

%%%%%%%%%%%%%%%%%%   计算卫星某历元在轨坐标并未考虑卫星钟的误差和相对论效应，原因是此项误差只有0.1米的距离误差,
%%%%%%%%%%%%%%%%%%   即：26641894*2*pi/12/3600* 2.75885686278e-005＝0.1069m ;    2010-11-10增补
SatCoord.clock_detat=EphDat(sub).a0+EphDat(sub).a1*tk+EphDat(sub).a2*tk^2         %% eg.   2.75885686278e-005,约合 8276米光的传播长度。 2010-11-10增补

%卫星钟差加上相对论改正
F=-4.442807633*1.0e-10;
detaTk=F*EphDat(sub).e*EphDat(sub).sqrtA*sin(Ek)                                  %% eg.  -8.92309854752801e-009;   1纳秒为10亿分之1秒，即：10e-9，约合0.3米光的传播长度。2010-11-10增补
SatCoord.clock_detat=SatCoord.clock_detat+detaTk;

return;