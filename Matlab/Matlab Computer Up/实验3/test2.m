% 例3-2 混叠现象与频率分辨率
close all;clear;clc

f1=20;    %20hz
f2=20.5; %20.5hz
f3=40;    %40hz
fs=100;  %100hz
t=0:0.01:1.27;
%t=n/fs;

x=sin(2*pi*f1*t)+sin(2*pi*f2*t)+sin(2*pi*f3*t);%(1)
figure('numbertitle','off','Name','例3-2 混叠现象与频率分辨率(1)');
subplot(2,1,1)
plot(x(1:128))
y1=fft(x,128);
f1=100*(0:127)/128;
title('202001030214');xlabel('t');ylabel('(1)');
subplot(2,1,2)
plot(f1,abs(y1))
title('202001030214');xlabel('t');ylabel('(1)');

xn=[x,zeros(1,384)];%(2)
figure('numbertitle','off','Name','例3-2 混叠现象与频率分辨率(2)');
subplot(2,1,1)
plot(xn(1:511))
y=fft(x,512);
f=100*(0:511)/512;
title('202001030214');xlabel('t');ylabel('(2)');
subplot(2,1,2)
plot(f,abs(y))
title('202001030214');xlabel('t');ylabel('(2)');

f1=20;    %20hz
f2=20.5; %20.5hz
f3=40;    %40hz
fs=100;  %100hz
t=0:0.01:5.11;
xx=sin(2*pi*f1*t)+sin(2*pi*f2*t)+sin(2*pi*f3*t);%(1)
figure('numbertitle','off','Name','例3-2 混叠现象与频率分辨率(3)');
subplot(2,1,1)
plot(xx(1:511))
yy=fft(xx,512);
ff=100*(0:511)/512;
title('202001030214');xlabel('t');ylabel('(3)');
subplot(2,1,2)
plot(ff,abs(yy))
title('202001030214');xlabel('t');ylabel('(3)');


