n=input('���������Ľ���');
a=1:1:n;
A=diag(a);
x=[1:1:n-1];
y=[1./x];
B=diag(y,1);
C=diag(y,-1);
resultmatrix=A+B+C;
D=det(resultmatrix);
disp('����ʽ��ֵ��');
disp(D);


