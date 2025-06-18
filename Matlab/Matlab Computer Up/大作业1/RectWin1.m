close all;                       %关闭所有窗口
Fs=500;                      %信号的最高频率
Tp=0.1;                      %截取长度
T=1/Fs;                         %时域采样间隔          
count=9;                      %Σ累计9
w=99*pi;                      %Ω=99*pi
Xn=0;                           %X(t)
An=1;                           %An
Gn=pi;                          %φn
N=Fs*Tp;
t=[0:T:N/Fs];                %采样时刻

%计算出信号
for n=1:1:count;
    Xn=Xn+An*sin(n*w*t+Gn);
end
%显示原始信号
plot(Xn);
title('原始信号');

figure;
Xn=Xn/max(abs(Xn));
wn=rectwin(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('幅值');
title('矩形窗 周文浩202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=triang(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('幅值');
title('三角窗 周文浩202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=hann(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('幅值');
title('汉宁窗 周文浩202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=hamming(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('幅值');
title('海明窗 周文浩202001030214')

figure;
Xn=Xn/max(abs(Xn));
wn=blackman(N+1);
Xn1=Xn.*wn';
Xk=fft(Xn1,4096);
fk=Fs*(0:4095);
plot(fk,abs(Xk)/max(abs(Xk)));
xlabel('HZ');
ylabel('幅值');
title('布拉克曼窗 周文浩202001030214')
%设信号的最高频率fc=11*99/2=544.5 Hz
%Tcmax=0.02s 
%为了分析各个窗函数对频谱分析的影响，
%暂定采样频率fs=1000,阶段时间Tp=0.06

%figure;
%Ayy=Ayy/(N/2);
%Ayy(1)=Ayy(1)/2;
%F=([1:N]-1)*Fs/N; %换算成实际的频率值
%plot(F(1:N/2),Ayy(1:N/2));   %显示换算后的FFT模值结果
%title('幅度-频率曲线图');

%figure;
%Pyy=[1:N/2];
%for i=1:N/2
 %Pyy(i)=phase(Y(i)); %计算相位
 %Pyy(i)=Pyy(i)*180/pi; %换算为角度
%end;
%plot(F(1:N/2),Pyy(1:N/2));   %显示相位图
%title('相位-频率曲线图');

%clear;clc
%t=linspace(-pi,pi,4096); %t
%An=1;               %An
%omiga=99*pi;   %Ω
%Gn=1;               %Φn
%Xn=0;               
%for n=1:1:9
%    Xn=Xn+An*sin(n*omiga*t+Gn);
%end
%disp(Xn)

%subplot(3,1,1)
%plot(Xn)
%title('信号');
%xlabel('X轴');
%ylabel('Y轴');

%subplot(3,1,2)

%subplot(3,1,3)



