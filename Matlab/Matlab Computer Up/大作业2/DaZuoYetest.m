clear;clc;              %清空
close all;              %关闭所有窗口
%===========初始变量的定义==========%
Fs=4000;                %信号的最高频率
Tp=0.1;                 %截取的长度
T=1/Fs;                 %时域采样间隔
count=9;                %信号累计求和次数
w=99*pi;                %Ω=99*Π
Xn=0;                   %X(t)
An=1;                   %An
Gn=pi/2;                %φn
N=Fs*Tp;                %
t=[0:T:N/Fs];           %采样时刻  %即t=[0:N]./Fs;

a=10;                   %单频噪声相关参数1
w0=1500*pi;                %单频噪声相关参数2
%===========初始变量的定义==========%

%信号的表示
    for n=1:1:count;
        Gn=randi([-6,6])*pi        
        An=An+1;
        Xn=Xn+An*sin(n*w*t+Gn);
    end
    zao=a*cos(w0*t);        %噪声信号 的 表示
%显示原始信号
    figure('numbertitle','off','name','(1)原始信号');
    subplot(2,1,1)
    plot(t,Xn)
    title('202001030214 原始信号');xlabel('时域');ylabel('信号');
% (1)用FFT对信号进行频谱分析 画出分析后的频谱图    
    y=fft(Xn,N);
    f=100*(0:N-1)/N;
    subplot(2,1,2);
    plot(f,abs(y))
    title('202001030214 FFT');xlabel('频率/HZ abs(y)');ylabel('振幅 f');

    %{
        added code
    %}
    figure('numbertitle','off','name','加噪前后信号FFT频谱');
    
    N1=length(Xn)-1;
    f1=(Fs/N1)*(0:N1/2-1);
    w1=2*pi*f1/Fs;
    Y1=fft(Xn);
    subplot(211)
    plot(w1,abs(Y1(1:N1/2)));
    title('原信号');xlabel('w');ylabel('|Y(f)|');
    
    Xn=Xn+zao;   %添加噪声
    N2=length(Xn)-1;
    f2=(Fs/N2)*(0:N2/2-1);
    w1=2*pi*f2/Fs;
    Y=fft(Xn);
    subplot(212)
    plot(w1,abs(Y(1:N2/2)));
    title('加噪声信号');xlabel('w');ylabel('|Y(f)|');
    %{
  
    %}

% 对信号添加单频噪声信号
    figure('numbertitle','off','name','(2)添加了噪声后的新信号');
    subplot(2,1,1);
    plot(t,Xn);
    title('202001030214 添加了噪声后的新信号');xlabel('时域');ylabel('信号');
% (2)对新的信号，用FFT对信号进行频谱分析 画出分析后的频谱图    
    y=fft(Xn,N);
    f=100*(0:N-1)/N;
    subplot(2,1,2);
    plot(f,abs(y));
    title('202001030214 FFT');xlabel('频率/HZ abs(y)');ylabel('振幅 f');


% (4)使用窗函数法  设计fir滤波器  画出滤波器h(n)的波形
    %三个窗的滤波 相关
    figure('numbertitle','off','name','(4)汉宁窗');
    wp=pi/2;ws=pi/4;
    Bt=wp-ws;
    N0=ceil(6.2*pi/Bt);
    Nn=N0+mod(N0+1,2);
    wc=(wp+ws)/2/pi;
    hn1=fir1(Nn-1,wc,'high',hanning(Nn));
    subplot(211);
    stem(hn1)
    title('202001030214 汉宁窗滤波器Hn');xlabel('频率/HZ abs(y)');ylabel('振幅 f');    
    subplot(212)
    M=1024;
    hk=fft(hn1,M);
    n=0:N-1;
    k=1:M/2;
    w=2*(0:M/2-1)/M;
    plot(w,20*log10(abs(hk(k))));
    title('202001030214 幅频响应损耗曲线');xlabel('ω/π');ylabel('20lg|Hg(ω)|');    
    
    
    figure('numbertitle','off','name','(4)哈明窗');
    wp=pi/2;ws=pi/4;
    Bt=wp-ws;
    N0=ceil(6.2*pi/Bt);
    Nn=N0+mod(N0+1,2);
    wc=(wp+ws)/2/pi;
    hn2=fir1(Nn-1,wc,'high',hamming(Nn));
    subplot(211)
    stem(hn2)
    title('202001030214 哈明窗滤波器Hn');xlabel('频率/HZ abs(y)');ylabel('振幅 f');
    subplot(212)
    B=[1 -0.5];
    A=[10];
    [H,w]=freqz(B,A);
    Hf=abs(H);              %取幅度值实部
    Hx=angle(H);            %取相位值对应相位角
    plot(w,20*log10(Hf));   %幅度值变换为分贝单位
    title('202001030214 幅频响应损耗曲线');xlabel('w');ylabel('20lg|Hg(ω)|');


    figure('numbertitle','off','name','(4)布莱克曼窗');    
    wlp=0.2*pi;wls=0.35*pi;wus=0.65*pi;wup=0.8*pi;
    B=wls-wlp;
    M=ceil(12*pi/B);
    wp=[(wls+wlp)/2/pi,(wus+wup)/2/pi];
    hn3=fir1(M,wp,'high',blackman(M+1));
    subplot(211)
    stem(hn3)
    title('202001030214 布莱克曼窗滤波器Hn');xlabel('频率/HZ abs(y)');ylabel('振幅 f');
    subplot(212)
    M=1024;
    hk=fft(hn3,M);
    n=0:N;
    k=1:M/2+1;
    w=2*(0:M/2)/M;
    plot(w,20*log10(abs(hk(k))));
    title('202001030214 幅频响应损耗曲线');xlabel('w');ylabel('20lg|Hg(ω)|');
    
%(5)用设计的滤波器对加噪的电网信号进行滤波处理  FFT进行频谱分析 画出图
    %法1
    y=filter(hn1,1,Xn);
    figure('numbertitle','off','name','(5)汉宁窗 滤波器');
    subplot(211);
    % stem(y);
    plot(y)
    title('202001030214 滤波处理');xlabel('');ylabel('');
    yfft=fft(y,N);
    f=100*(0:N-1)/N;
    subplot(212);
    plot(f(1:N/2),abs(yfft(1:N/2)));
    title('202001030214 FFT');xlabel('频率/HZ abs(y)');ylabel('振幅 f');
    % %法2
    % %y=filter(Xn,zao);
    % %figure;
    % %plot(y)

    y=filter(hn2,1,Xn);
    figure('numbertitle','off','name','(5)哈明窗 滤波器');
    subplot(211);
    % stem(y);
    plot(y)
    title('202001030214 滤波处理');xlabel('');ylabel('');
    yfft=fft(y,N);
    f=100*(0:N-1)/N;
    subplot(212);
    plot(f(1:N/2),abs(yfft(1:N/2)));
    title('202001030214 FFT');xlabel('频率/HZ abs(y)');ylabel('振幅 f');

    y=filter(hn3,1,Xn);
    figure('numbertitle','off','name','(5)布莱克曼窗 滤波器');
    subplot(211);
    % stem(y);
    plot(y)
    title('202001030214 滤波处理');xlabel('');ylabel('');
    yfft=fft(y,N);
    f=100*(0:N-1)/N;
    subplot(212);
    plot(f(1:N/2),abs(yfft(1:N/2)));
    title('202001030214 FFT');xlabel('频率/HZ abs(y)');ylabel('振幅 f');


