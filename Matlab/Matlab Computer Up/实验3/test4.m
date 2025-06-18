% 例3-4 利用Chirp z 变换计算滤波器h

h=fir1(30,125/500,boxcar(31));
fs=1000;
f1=100;f2=200;
m=1024;
y=fft(h,1024);
fy=fs*(0:1023)/1024;

figure('numbertitle','off','name','例3-4 利用Chirp z 变换计算滤波器h')
subplot(2,1,1);
plot(fy,abs(y));
title('202001030214');xlabel('');ylabel('');

axis([0,500,0,1.5]);
w=exp(-j*2*pi*(f2-f1)/(m*fs));
a=exp(j*2*pi*f1/fs);
z=czt(h,m,w,a);
fz=(f2-f1)*(0:1023)/1024+f1;

subplot(2,1,2);
plot(fz,abs(z))
title('202001030214');xlabel('');ylabel('');

%figure('numberiftitle','off','name','例3-4 利用Chirp z 变换计算滤波器h');
%subplot(2,1,1);

%subplot(2,1,2);

