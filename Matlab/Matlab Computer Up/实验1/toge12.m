%rand(2,3) �����2��3�еľ���
clc;clear;
%��ֵ�� ð�� ��������������
n=-10:20;
%�þ���'[' ']' ���и�ֵ zeros(�����)
u=[zeros(1,10) 1 zeros(1,20)];
%�������� ��ά ��ɢ��
subplot(2,1,1)
stem(n,u);
%plot(n,u);
%��ע�� ������ ' 
%ʵ�鱨����ͼ�Ļ� ����ȡ�Լ�ѧ��
xlabel('Time index n');
ylabel('Amplitude');
title('202001030214');
axis([-10 20 0 1.2]);


clc;clear;
%����1-2 ����������
n=0:0.1:40;
f=0.1;
phase=0;
A=1.5;
arg=2*pi*f*n-phase;
x=A*cos(arg);
clf;
%stem(n,x);
subplot(2,1,2)
plot(n,x);
axis([0 40 -2 2]);
grid; 
xlabel('Time index n');
ylabel('Amplitude');
title('202001030214');
axis;
