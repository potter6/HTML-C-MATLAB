%���źŵ����Ƶ��fc=11*99/2=544.5 Hz
%Tcmax=0.02s 
%Ϊ�˷���������������Ƶ�׷�����Ӱ�죬
%�ݶ�����Ƶ��fs=1000,�׶�ʱ��Tp=0.06
Fs=1800;                       %
T=1/Fs;                          %
Tp=0.2;                       %
N=Tp*Fs;
count=9;                       %���ۼ�9
Xn=0;                            %X(t)
An=1;                            %An
Gn=pi/3;                       %��n
omiga=99*pi;                %��=99*pi
%t=linspace(-pi,pi,4096); %t
t=linspace(-pi,pi,4096); 

for n=1:1:count;
    Xn=Xn+An*sin(n*omiga*t+Gn);
end

wn=hanning(4096);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('Hz');
ylabel('��ֵ');
title('������ ���ĺ�202001030214');

