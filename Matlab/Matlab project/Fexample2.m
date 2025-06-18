fs=1;   	  % Sampling Frequency
ts=1/fs;   	 % Sampling Time
N=16;    	  % Sampling points
L=N*ts;    	 % Length of Signal
t=(0:N-1)*ts;   % Time Vector
t0=0; t1=10;    % t1-t0 为脉宽
X=zeros(1,N);   % 用于储存FT值

ut1=stepfun(t,t0);		% 产生阶跃函数
ut2=stepfun(t,t1);
x=ut1-ut2; 		% 产生0-9的窗函数
subplot(311);
stem(t,x);grid on
xlabel('n'),ylabel('x(n)'),title('原始信号');

for k=0:N-1 		% 计算DFT
   for n=0:N-1  		% MATLAB的下表索引从1开始，所以为了得到正确的结果要进行处理
      X(k+1)=X(k+1)+x(n+1)*exp(-1i*2*pi*n*k/N);
   end
end
k=0:N-1;
subplot(312),stem(k,abs(X),'.');grid on
xlabel('k'),ylabel('X(k)'),title('DFT');

Uw=fft(x,N);
subplot(313);
stem(k,abs(Uw));grid on
xlabel('k');ylabel('X(k)');title('FFT');
