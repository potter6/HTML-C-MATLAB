%���źŵ����Ƶ��fc=11*99/2=544.5 Hz
%Tcmax=0.02s 
%Ϊ�˷���������������Ƶ�׷�����Ӱ�죬
%�ݶ�����Ƶ��fs=1000,�׶�ʱ��Tp=0.06
Fs=1000;                       
T=1/Fs;                          
Tp=0.06;                       
count=9;                       %���ۼ�9
w=99*pi;                       %��=99*pi
Xn=0;                            %X(t)
An=1;                            %An
Gn=pi;                          %��n
omiga=99*pi;                %��
N=Fs*Tp;
t=[0:1/Fs:N/Fs];  %����ʱ��

for n=1:1:count;
    Xn=Xn+An*sin(n*omiga*t+Gn);
end

Xn=Xn/max(abs(Xn));
fk=Fs*(0:4095);
Xk=fft(Xn,4096);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('Hz');
ylabel('��ֵ');
title('���Ǵ���FFT ���ĺ�202001030214');




