clf;
R=51;
d=0.8*(rand(R,1)-0.5);%�������
m=0:R-1;
s=2*m.*(0.9.^m);    %����δ����Ⱦ���ź�
x=s+d';                   %������������Ⱦ���ź�
subplot(2,1,1);        %���� ����һ�� һ��ͼ
plot(m,d','r-',m,s,'g--',m,x,'b-.');%�졢�̡��� ��ɫ
title('202001030214');
xlabel('Time index n');ylabel('Amplitude');
legend('d[n]','s[n]','x[n]');%��ע
x1=[0 0 x]; x2=[0 x 0]; x3=[x 0 0];
y=(x1+x2+x3)/3;
subplot(2,1,2);%���� ����һ�� ����ͼ
plot(m,y(2:R+1),'r-',m,s,'g--');
legend('y[n]','s[n]');
title('202001030214');
xlabel('Time index n');ylabel('Amplitude');

%subplot(3,1,3);
%plot(m,y(2:R+1));
%axis����ͨ���ڻ�ͼ��������������ֵ��Χ