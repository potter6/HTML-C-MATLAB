%2-3 线性时不变系统的冲激响应计算
clf;close all;
n=0:40; a=2;b=-3;
x1=cos(2*pi*0.1*n);
x2=cos(2*pi*0.4*n);
x=a*x1+b*x2;
num=[2.2403 2.4908 2.2403];
den=[1 -0.4 0.75]; ic=[0 0];
y1=filter(num,den,x1,ic);
y2=filter(num,den,x2,ic);
y=filter(num,den,x,ic);
yt=a*y1+b*y2; d=y-yt;
figure('NumberTitle','off','Name','系统冲激响应前N个样本')
N=40;
y=impz(num,den,N);
subplot(2,1,1);stem(y)
xlabel(' Time index n');ylabel(' Amplitude');
title('离散 202001030214');
subplot(2,1,2);plot(y)
xlabel(' Time index n');ylabel(' Amplitude');
title('连续 202001030214');
