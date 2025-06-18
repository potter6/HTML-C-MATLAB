% 例3-3 频域采样定理的验证
% y=ifft(x)
% y=ifft(x,n)
close all;clear;clc

M=40;
n1=0:M/2;n2=M/2+1:M;
m=[n1,40-n2]; %x(n)

figure('numbertitle','off','name','例3-3 频域采样定理的验证(1)(2)')
subplot(2,1,1);%stem(0:40,m);
stem(0:M,m);title('202001030214 x(n)');xlabel('n');ylabel('x(n)');
subplot(2,1,2);
y=fft(m,64); %x(n)
f=100*(0:63)/64;
plot(f,abs(y));title('202001030214 X(k)');xlabel('k');ylabel('X(k)');

figure('numbertitle','off','name','例3-3 频域采样定理的验证(3)(4)')
subplot(2,1,1);
k=0:2*pi;
f1=100*(0:2*pi/32:2*pi*(1-1/32))/2*pi; %在[0,2pi]上个进行32点抽样 
yn=ifft(m,32);
stem(f1,abs(yn));title('202001030214 X1(k)');xlabel('k');ylabel('X1(k)');
subplot(2,1,2);%采用周期延拓方法给出X1((n))32的波形 评述其与X(n)的关系
k=0:32;
f132=100*(0:31)/32;
y1n=ifft(m,32);
stem(f132,abs(y1n));title('202001030214 X1((n))32');xlabel('n');ylabel('X1((n))32');

%subplot(2,1,2);
%采用周期延拓方法给出X1((n))32的波形 评述其与X(n)的关系
%k=0:32;
%f132=100*(0:31)/32;
%y1n=ifft(m,32);
%stem(f132,abs(y1n));title('202001030214 X1((n))32');xlabel('n');ylabel('X1((n))32');

