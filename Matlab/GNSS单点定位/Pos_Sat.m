function SatCoord=Pos_Sat(rpn,pos_time)
%compute the position of satellite at the pos_time
%according to the Kepler motion law
%written  25/8/2006

%inputs: 
%        rpn:     the code of satellite
%       pos_time: the time 
%Output:
%       SatCoord:  satellite 3D position X��Y��Z;   The unit is Meter
%       ClockError:satellite clock error;           The unit is Second

global EphDat         % EphDat����Read_N_Renix()�����Ľṹ�����;

GM=3.986004418e+14;   %%��������������
omgedot=7.292115e-5;  %%������ת�ٶȣ�����ÿ�룩

Enum=length(EphDat);   %�ܹ۲����ǵ�������It's no the number of Epoch

for i=1:Enum     %�����Ƿ���Ҫ��������ǵ������ļ�
    if (EphDat(i).SatPRN==rpn)  %�����������¸����ǵ��±�
        sub=i;
        dt=abs(pos_time-EphDat(i).MJDTime);
        for j=i+1:Enum
            %�����Ǻ���ͬ��ʱ��������ʱ��ȽϽӽ�����Ԫ
            %if ((EphDat(i).SatPRN==rpn) && (abs(pos_time-EphDat(i).MJDTime)<dt))  
            if ((EphDat(j).SatPRN==rpn) && (abs(pos_time-EphDat(j).MJDTime)<dt)) %%   2010��11��10������
                dt=abs(pos_time-EphDat(j).MJDTime);
                sub=j;
            end
        end
        break;
    end
end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%����������ά���� %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

Aa=EphDat(sub).sqrtA^2;              %���򳤰뾶
n=sqrt(GM/Aa^3)+EphDat(sub).DetaN;   %�������ƽ�����ٶ�     ��1��

tk=((pos_time-44244)-(fix((pos_time-44244)/7))*7)*3600*24-EphDat(sub).Toe;   %�滮ʱ��   ��2��  
%�������Ҫʱ��pos_time���ο�ʱ��Toe��ʱ���
%ȥ��GPS�ܣ��ȹ滮��GPS����
%ע��Toe(��λ����)ʹ�õ�ʱ����GPS Week+Seconds.
%GPS��׼��Ԫ1980.1.6�ĸĽ�������Ϊ44244

if (tk<-302400)
    tk=tk+604800;
elseif(tk>302400)
    tk=tk-604800;
end
    
Mk=EphDat(sub).M0+n*tk;              %ƽ�����   ��3��
Ek1=Mk;    	                         %%%%%%%%%%%%% ��������Ek,Ek��ֵΪMk %%%%%%%%%%
Ek0=0.0;
while (abs(Ek1-Ek0)>1.0e-12)         %ƫ�����Ek��������
    
    Ek0=Ek1;
    Ek1=Mk+EphDat(sub).e*sin(Ek0);
end
Ek=Ek1;                              %ƫ�����   ��4��

vk=2*atan(sqrt((1.0+EphDat(sub).e)/(1-EphDat(sub).e))*tan(Ek/2)); %���ð�ǹ�ʽ���㣬����������  ��5��
uk=vk+EphDat(sub).omg;               %�����Ǿ࣬�����������ǵļн�    ��6��
detauk=EphDat(sub).Cuc*cos(2*uk)+EphDat(sub).Cus*sin(2*uk);   %�����Ǿ�����㶯   ��7��
detark=EphDat(sub).Crc*cos(2*uk)+EphDat(sub).Crs*sin(2*uk);   %�����򾶶����㶯   ��7��
detaik=EphDat(sub).Cic*cos(2*uk)+EphDat(sub).Cis*sin(2*uk);   %��Ƕ����㶯       ��7��

u=uk+detauk;                             %������������Ǿ�   ��8��
r=Aa*(1-EphDat(sub).e*cos(Ek))+detark;   %������ĵ�����   ��8��
ii=EphDat(sub).I0+detaik+EphDat(sub).I0dot*tk;   %������Ĺ����� ��8��


%%���ǹ��ƽ������   ��9��
x=r*cos(u);
y=r*sin(u);

%����������ľ���(�Ӵ��ֵ�vemal equinox�������������ε�Greenwich)
OMG=EphDat(sub).OMG0+(EphDat(sub).OMG0dot-omgedot)*tk-omgedot*EphDat(sub).Toe;   %�۲�˲��������ľ���ֵ

%�����ڵع�ϵ�������  ��10��
SatCoord.X=(x*cos(OMG)-y*cos(ii)*sin(OMG));
SatCoord.Y=(x*sin(OMG)+y*cos(ii)*cos(OMG));
SatCoord.Z=(y*sin(ii));

%%%%%%%%%%%%%%%%%%   ��������ĳ��Ԫ�ڹ����겢δ���������ӵ����������ЧӦ��ԭ���Ǵ������ֻ��0.1�׵ľ������,
%%%%%%%%%%%%%%%%%%   ����26641894*2*pi/12/3600* 2.75885686278e-005��0.1069m ;    2010-11-10����
SatCoord.clock_detat=EphDat(sub).a0+EphDat(sub).a1*tk+EphDat(sub).a2*tk^2         %% eg.   2.75885686278e-005,Լ�� 8276�׹�Ĵ������ȡ� 2010-11-10����

%�����Ӳ��������۸���
F=-4.442807633*1.0e-10;
detaTk=F*EphDat(sub).e*EphDat(sub).sqrtA*sin(Ek)                                  %% eg.  -8.92309854752801e-009;   1����Ϊ10�ڷ�֮1�룬����10e-9��Լ��0.3�׹�Ĵ������ȡ�2010-11-10����
SatCoord.clock_detat=SatCoord.clock_detat+detaTk;

return;