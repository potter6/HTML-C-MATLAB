clear all;clc;close all;
w = linspace(-pi,pi,4096);
%=========================
%矩形窗的频率响应图    
%=========================
wn1 = rectwin(51)   %矩形窗
h1 = freqz(wn1,1,w);
subplot(3,1,1);
plot(w/pi,20*log10(abs(h1/max(h1)))); %以归一化频率为横坐标
axis([-1 1 -100 0]); 
xlabel('归一化频率 /\pi');  
ylabel('20log_{10}|W(e^{j\omega})| /dB');  
title('矩形窗的傅里叶变换');

%=========================
%汉明窗的频率响应图    
%=========================
wn2 = hamming(51) %汉明窗
h2 = freqz(wn2,1,w);
subplot(3,1,2);
plot(w/pi,20*log10(abs(h2/max(h2)))); %以归一化频率为横坐标
axis([-1 1 -100 0]);
xlabel('归一化频率 /\pi'); 
ylabel('20log_{10}|W(e^{j\omega})| /dB');  
title('汉明窗的傅里叶变换');

%=========================
%汉宁窗的频率响应图   
%=========================
wn3 = hanning(51)  
h3 = freqz(wn3,1,w); 
subplot(3,1,3);
plot(w/pi,20*log10(abs(h3/max(h3))));  %以归一化频率为横坐标
axis([-1 1 -100 0]); 
xlabel('归一化频率 /\pi');  
ylabel('20log_{10}|W(e^{j\omega})| /dB');  
title('汉宁窗的傅里叶变换');

