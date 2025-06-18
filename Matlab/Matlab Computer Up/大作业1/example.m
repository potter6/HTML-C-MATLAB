clear all;clc;close all;
w = linspace(-pi,pi,4096);
%=========================
%���δ���Ƶ����Ӧͼ    
%=========================
wn1 = rectwin(51)   %���δ�
h1 = freqz(wn1,1,w);
subplot(3,1,1);
plot(w/pi,20*log10(abs(h1/max(h1)))); %�Թ�һ��Ƶ��Ϊ������
axis([-1 1 -100 0]); 
xlabel('��һ��Ƶ�� /\pi');  
ylabel('20log_{10}|W(e^{j\omega})| /dB');  
title('���δ��ĸ���Ҷ�任');

%=========================
%��������Ƶ����Ӧͼ    
%=========================
wn2 = hamming(51) %������
h2 = freqz(wn2,1,w);
subplot(3,1,2);
plot(w/pi,20*log10(abs(h2/max(h2)))); %�Թ�һ��Ƶ��Ϊ������
axis([-1 1 -100 0]);
xlabel('��һ��Ƶ�� /\pi'); 
ylabel('20log_{10}|W(e^{j\omega})| /dB');  
title('�������ĸ���Ҷ�任');

%=========================
%��������Ƶ����Ӧͼ   
%=========================
wn3 = hanning(51)  
h3 = freqz(wn3,1,w); 
subplot(3,1,3);
plot(w/pi,20*log10(abs(h3/max(h3))));  %�Թ�һ��Ƶ��Ϊ������
axis([-1 1 -100 0]); 
xlabel('��һ��Ƶ�� /\pi');  
ylabel('20log_{10}|W(e^{j\omega})| /dB');  
title('�������ĸ���Ҷ�任');

