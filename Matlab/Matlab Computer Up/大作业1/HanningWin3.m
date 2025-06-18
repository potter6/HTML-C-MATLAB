%设信号的最高频率fc=11*99/2=544.5 Hz
%Tcmax=0.02s 
%为了分析各个窗函数对频谱分析的影响，
%暂定采样频率fs=1000,阶段时间Tp=0.06
Fs=1800;                       %
T=1/Fs;                          %
Tp=0.2;                       %
N=Tp*Fs;
count=9;                       %Σ累计9
Xn=0;                            %X(t)
An=1;                            %An
Gn=pi/3;                       %φn
omiga=99*pi;                %Ω=99*pi
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
ylabel('幅值');
title('汉宁窗 周文浩202001030214');

