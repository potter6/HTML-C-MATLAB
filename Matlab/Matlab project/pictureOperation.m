clear;clc;
close all;
x=imread('D:\A My Video Music\picture\���շ���\��� �ٵ�.jpg');
size(x)
%disp(x)
figure('numbertitle','off','name','front')
imshow(x)
hold on
pause(1)
x1=rgb2gray(x)
figure('numbertitle','off','name','after')
imshow(x1)
size(x1)
fprintf('�任��������ǰ����ɵ�\n')
%result=x1./x
%result
subplot(121),imshow(x),title('ԭͼ��')
subplot(122),imshow(x1),title('�仯��ͼ��')
