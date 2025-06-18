clf;
R=51;
d=0.8*(rand(R,1)-0.5);%随机噪声
m=0:R-1;
s=2*m.*(0.9.^m);    %产生未被污染的信号
x=s+d';                   %产生被噪声污染的信号
subplot(2,1,1);        %分行 两行一列 一个图
plot(m,d','r-',m,s,'g--',m,x,'b-.');%红、绿、蓝 三色
title('202001030214');
xlabel('Time index n');ylabel('Amplitude');
legend('d[n]','s[n]','x[n]');%标注
x1=[0 0 x]; x2=[0 x 0]; x3=[x 0 0];
y=(x1+x2+x3)/3;
subplot(2,1,2);%分行 两行一列 二个图
plot(m,y(2:R+1),'r-',m,s,'g--');
legend('y[n]','s[n]');
title('202001030214');
xlabel('Time index n');ylabel('Amplitude');

%subplot(3,1,3);
%plot(m,y(2:R+1));
%axis函数通常在绘图中用于设置坐标值范围