N=16;           % 窗函数长度
x=rectwin(N);   % 产生0到（N-1）的矩形窗函数
n=0:N-1;        % 离散时间变量
X=zeros(1,N);   % 用于储存FT值
subplot(311);stem(n,x,'.'),grid on
xlabel('n'),ylabel('x(n)'),title('原始信号');

for k=0:N-1 % 计算DFT
   for n=0:N-1	 % MATLAB的下表索引从1开始，所以为了得到正确的结果要进行处理
      X(k+1)=X(k+1)+x(n+1)*exp(-1i*2*pi*n*k/N);
   end
end
k=0:N-1;
subplot(312),stem(k,abs(X),'.');grid on
xlabel('k'),ylabel('X(k)'),title('DFT');

y=fft(x,N); % 计算FFT，验证上面的DFT算法
subplot(313);stem(k,abs(y),'.');grid on
xlabel('k');ylabel('X(k)');title('FFT');
