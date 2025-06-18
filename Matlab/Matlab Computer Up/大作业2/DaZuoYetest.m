clear;clc;              %���
close all;              %�ر����д���
%===========��ʼ�����Ķ���==========%
Fs=4000;                %�źŵ����Ƶ��
Tp=0.1;                 %��ȡ�ĳ���
T=1/Fs;                 %ʱ��������
count=9;                %�ź��ۼ���ʹ���
w=99*pi;                %��=99*��
Xn=0;                   %X(t)
An=1;                   %An
Gn=pi/2;                %��n
N=Fs*Tp;                %
t=[0:T:N/Fs];           %����ʱ��  %��t=[0:N]./Fs;

a=10;                   %��Ƶ������ز���1
w0=1500*pi;                %��Ƶ������ز���2
%===========��ʼ�����Ķ���==========%

%�źŵı�ʾ
    for n=1:1:count;
        Gn=randi([-6,6])*pi        
        An=An+1;
        Xn=Xn+An*sin(n*w*t+Gn);
    end
    zao=a*cos(w0*t);        %�����ź� �� ��ʾ
%��ʾԭʼ�ź�
    figure('numbertitle','off','name','(1)ԭʼ�ź�');
    subplot(2,1,1)
    plot(t,Xn)
    title('202001030214 ԭʼ�ź�');xlabel('ʱ��');ylabel('�ź�');
% (1)��FFT���źŽ���Ƶ�׷��� �����������Ƶ��ͼ    
    y=fft(Xn,N);
    f=100*(0:N-1)/N;
    subplot(2,1,2);
    plot(f,abs(y))
    title('202001030214 FFT');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');

    %{
        added code
    %}
    figure('numbertitle','off','name','����ǰ���ź�FFTƵ��');
    
    N1=length(Xn)-1;
    f1=(Fs/N1)*(0:N1/2-1);
    w1=2*pi*f1/Fs;
    Y1=fft(Xn);
    subplot(211)
    plot(w1,abs(Y1(1:N1/2)));
    title('ԭ�ź�');xlabel('w');ylabel('|Y(f)|');
    
    Xn=Xn+zao;   %�������
    N2=length(Xn)-1;
    f2=(Fs/N2)*(0:N2/2-1);
    w1=2*pi*f2/Fs;
    Y=fft(Xn);
    subplot(212)
    plot(w1,abs(Y(1:N2/2)));
    title('�������ź�');xlabel('w');ylabel('|Y(f)|');
    %{
  
    %}

% ���ź���ӵ�Ƶ�����ź�
    figure('numbertitle','off','name','(2)���������������ź�');
    subplot(2,1,1);
    plot(t,Xn);
    title('202001030214 ���������������ź�');xlabel('ʱ��');ylabel('�ź�');
% (2)���µ��źţ���FFT���źŽ���Ƶ�׷��� �����������Ƶ��ͼ    
    y=fft(Xn,N);
    f=100*(0:N-1)/N;
    subplot(2,1,2);
    plot(f,abs(y));
    title('202001030214 FFT');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');


% (4)ʹ�ô�������  ���fir�˲���  �����˲���h(n)�Ĳ���
    %���������˲� ���
    figure('numbertitle','off','name','(4)������');
    wp=pi/2;ws=pi/4;
    Bt=wp-ws;
    N0=ceil(6.2*pi/Bt);
    Nn=N0+mod(N0+1,2);
    wc=(wp+ws)/2/pi;
    hn1=fir1(Nn-1,wc,'high',hanning(Nn));
    subplot(211);
    stem(hn1)
    title('202001030214 �������˲���Hn');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');    
    subplot(212)
    M=1024;
    hk=fft(hn1,M);
    n=0:N-1;
    k=1:M/2;
    w=2*(0:M/2-1)/M;
    plot(w,20*log10(abs(hk(k))));
    title('202001030214 ��Ƶ��Ӧ�������');xlabel('��/��');ylabel('20lg|Hg(��)|');    
    
    
    figure('numbertitle','off','name','(4)������');
    wp=pi/2;ws=pi/4;
    Bt=wp-ws;
    N0=ceil(6.2*pi/Bt);
    Nn=N0+mod(N0+1,2);
    wc=(wp+ws)/2/pi;
    hn2=fir1(Nn-1,wc,'high',hamming(Nn));
    subplot(211)
    stem(hn2)
    title('202001030214 �������˲���Hn');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');
    subplot(212)
    B=[1 -0.5];
    A=[10];
    [H,w]=freqz(B,A);
    Hf=abs(H);              %ȡ����ֵʵ��
    Hx=angle(H);            %ȡ��λֵ��Ӧ��λ��
    plot(w,20*log10(Hf));   %����ֵ�任Ϊ�ֱ���λ
    title('202001030214 ��Ƶ��Ӧ�������');xlabel('w');ylabel('20lg|Hg(��)|');


    figure('numbertitle','off','name','(4)����������');    
    wlp=0.2*pi;wls=0.35*pi;wus=0.65*pi;wup=0.8*pi;
    B=wls-wlp;
    M=ceil(12*pi/B);
    wp=[(wls+wlp)/2/pi,(wus+wup)/2/pi];
    hn3=fir1(M,wp,'high',blackman(M+1));
    subplot(211)
    stem(hn3)
    title('202001030214 �����������˲���Hn');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');
    subplot(212)
    M=1024;
    hk=fft(hn3,M);
    n=0:N;
    k=1:M/2+1;
    w=2*(0:M/2)/M;
    plot(w,20*log10(abs(hk(k))));
    title('202001030214 ��Ƶ��Ӧ�������');xlabel('w');ylabel('20lg|Hg(��)|');
    
%(5)����Ƶ��˲����Լ���ĵ����źŽ����˲�����  FFT����Ƶ�׷��� ����ͼ
    %��1
    y=filter(hn1,1,Xn);
    figure('numbertitle','off','name','(5)������ �˲���');
    subplot(211);
    % stem(y);
    plot(y)
    title('202001030214 �˲�����');xlabel('');ylabel('');
    yfft=fft(y,N);
    f=100*(0:N-1)/N;
    subplot(212);
    plot(f(1:N/2),abs(yfft(1:N/2)));
    title('202001030214 FFT');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');
    % %��2
    % %y=filter(Xn,zao);
    % %figure;
    % %plot(y)

    y=filter(hn2,1,Xn);
    figure('numbertitle','off','name','(5)������ �˲���');
    subplot(211);
    % stem(y);
    plot(y)
    title('202001030214 �˲�����');xlabel('');ylabel('');
    yfft=fft(y,N);
    f=100*(0:N-1)/N;
    subplot(212);
    plot(f(1:N/2),abs(yfft(1:N/2)));
    title('202001030214 FFT');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');

    y=filter(hn3,1,Xn);
    figure('numbertitle','off','name','(5)���������� �˲���');
    subplot(211);
    % stem(y);
    plot(y)
    title('202001030214 �˲�����');xlabel('');ylabel('');
    yfft=fft(y,N);
    f=100*(0:N-1)/N;
    subplot(212);
    plot(f(1:N/2),abs(yfft(1:N/2)));
    title('202001030214 FFT');xlabel('Ƶ��/HZ abs(y)');ylabel('��� f');


