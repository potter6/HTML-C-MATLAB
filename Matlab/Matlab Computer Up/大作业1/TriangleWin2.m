%设信号的最高频率fc=11*99/2=544.5 Hz
%Tcmax=0.02s 
%为了分析各个窗函数对频谱分析的影响，
%暂定采样频率fs=1000,阶段时间Tp=0.06
Fs=1000;                       
T=1/Fs;                          
Tp=0.06;                       
count=9;                       %Σ累计9
w=99*pi;                       %Ω=99*pi
Xn=0;                            %X(t)
An=1;                            %An
Gn=pi;                          %φn
omiga=99*pi;                %Ω
N=Fs*Tp;
t=[0:1/Fs:N/Fs];  %采样时刻

for n=1:1:count;
    Xn=Xn+An*sin(n*omiga*t+Gn);
end

Xn=Xn/max(abs(Xn));
fk=Fs*(0:4095);
Xk=fft(Xn,4096);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('Hz');
ylabel('幅值');
title('三角窗的FFT 周文浩202001030214');




