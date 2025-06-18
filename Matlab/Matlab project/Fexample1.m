N=16;           % ����������
x=rectwin(N);   % ����0����N-1���ľ��δ�����
n=0:N-1;        % ��ɢʱ�����
X=zeros(1,N);   % ���ڴ���FTֵ
subplot(311);stem(n,x,'.'),grid on
xlabel('n'),ylabel('x(n)'),title('ԭʼ�ź�');

for k=0:N-1 % ����DFT
   for n=0:N-1	 % MATLAB���±�������1��ʼ������Ϊ�˵õ���ȷ�Ľ��Ҫ���д���
      X(k+1)=X(k+1)+x(n+1)*exp(-1i*2*pi*n*k/N);
   end
end
k=0:N-1;
subplot(312),stem(k,abs(X),'.');grid on
xlabel('k'),ylabel('X(k)'),title('DFT');

y=fft(x,N); % ����FFT����֤�����DFT�㷨
subplot(313);stem(k,abs(y),'.');grid on
xlabel('k');ylabel('X(k)');title('FFT');
