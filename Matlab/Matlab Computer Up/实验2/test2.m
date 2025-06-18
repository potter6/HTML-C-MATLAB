%2-2.因果系统的时不变特性研究
%
clf;close all;
n=0:40;
a=3;b=-2;%a=2 b=-3的权
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
d=y-yt;

figure('NumberTitle','off','Name','X(n)');
subplot(3,1,1)
stem(n, y);
xlabel(' Time index n');ylabel(' Amplitude');title('y 202001030214');
subplot(3,1,2)
stem(n, yt);
xlabel(' Time index n');ylabel(' Amplitude');title('yt 202001030214');
subplot(3,1,3)
stem(n, d);
xlabel(' Time index n');ylabel(' Amplitude');title('d(y-yt) 202001030214');

figure('NumberTitle','off','Name','y1[n]、y2[n+D]、y1[n]-y2[n+D]');
subplot(3,1,1)
stem(n, y1);
xlabel(' Time index n');ylabel(' Amplitude');title('y1[n]" 202001030214');

D=10.;
n=0:40;
n=n+D;                    %n+D
x1=cos(2*pi*0.1*n); %x1(n+D)
x2=cos(2*pi*0.4*n); %x2(n+D)
x=a*x1+b*x2;          %x(n+D)=a.x1(n+D)+b.x2(n+D)

yd1= filter(num,den,x1,ic);
yd2= filter(num,den,x2,ic);
yd=filter(num,den,x,ic);
ydt=a*yd1+b*yd2;
d=yd - ydt;

subplot(3,1,2)
stem(n, yd2);
xlabel(' Time index n');ylabel(' Amplitude');title('y2[n+D]  202001030214');
subplot(3,1,3)
stem(n, y1+yd2);
xlabel(' Time index n');ylabel(' Amplitude');title('y1[n]-y2[n+D]  202001030214');

figure('NumberTitle','off','Name','X(n+D)');
subplot(3,1,1)
stem(n, yd);
xlabel(' Time index n');ylabel(' Amplitude');title('y  202001030214');
subplot(3,1,2)
stem(n, ydt);
xlabel(' Time index n');ylabel(' Amplitude');title('yt" 202001030214');
subplot(3,1,3)
stem(n, d);
xlabel(' Time index n');ylabel(' Amplitude');title('d(y-yt)" 202001030214');



