clc;clear;
%filenameָҪ��ȡ���ļ����ƣ� ע�����ź��ļ���׺
%samplesָ��ȡ�ļ������򣬾ٸ����ӣ�����ļ���100��������ô���������ȡǰһ������ݣ��˴�ӦΪ[1,50]
%datatypeָ��ȡ���ļ������ݸ�ʽ����double��native
filename='D:\A My Video Music\music\cxk.wav';
[y,Fs] = audioread(filename);
samples=[1,50];
[y,Fs] = audioread(filename,samples);
y=audioread(filename)
plot(y)

%[y,Fs] = audioread(filename,dataType) ���
%[y,Fs] = audioread(filename,native)
%[y,Fs] = audioread(filename,double)


