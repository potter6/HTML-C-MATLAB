%2-1.线性和非线性系统
clf;close all; n=0:40; a=2;b=-3;%主加权
x1=cos(2*pi*0.1*n); %x1(n)
x2=cos(2*pi*0.4*n); %x2(n)
x=a*x1+b*x2;          %x(n)=a.x1(n)+b.x2(n)
num =[2.2403 2.4908 2.2403];
den =[1 -0.4 0.75]; ic =[0 0];
y1= filter(num,den,x1,ic);
y2= filter(num,den,x2,ic);
y=filter(num,den,x,ic);
yt=a*y1+b*y2; d=y - yt;
figure('NumberTitle', 'off', 'Name', '加权输入');
subplot(3,1,1);stem(n, y1);
xlabel(' Time index n');ylabel(' Amplitude');
title('y1 202001030214');
subplot(3,1,2);stem(n, y2);
xlabel(' Time index n');ylabel(' Amplitude');
title('y2 202001030214');
subplot(3,1,3);stem(n, yt);
xlabel(' Time index n');ylabel(' Amplitude');
title('y 202001030214');

%修改a、b后
figure('NumberTitle','off','Name','相同权输入');
n=0:40;
a=1;b=1;%相同权系数
x1=cos(2*pi*0.1*n); %x1(n)
x2=cos(2*pi*0.4*n); %x2(n)
x=a*x1+b*x2;          %x(n)=a.x1(n)+b.x2(n)
num =[2.2403 2.4908 2.2403];
den =[1 -0.4 0.75];
ic =[0 0];
y1= filter(num,den,x1,ic);
y2= filter(num,den,x2,ic);
y=filter(num,den,x,ic);
yt=a*y1+b*y2;
d=y - yt;
subplot(3,1,1);stem(n, y);
xlabel(' Time index n');ylabel(' Amplitude');
title('y 202001030214');
subplot(3,1,2);stem(n, yt);
xlabel(' Time index n');ylabel(' Amplitude');
title('yt 202001030214');
subplot(3,1,3);stem(n, d);
xlabel(' Time index n');ylabel(' Amplitude');
title('d(y-yt) 202001030214');


