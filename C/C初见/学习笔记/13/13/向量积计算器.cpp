#include<stdio.h>
#include<math.h>
void main()
{
	int a,b,c,d,e,f,i,j,k;
	printf("�������һ���������������֣� ");
	scanf("%d%d%d",&a,&b,&c);  
	printf("������ڶ����������������֣� ");
	scanf("%d%d%d",&d,&e,&f);
	i=b*f-e*c;
	j=c*d-a*f;
	k=a*e-b*d;
	printf("���Ϊ�� (%d,%d,%d) \n��     =(%di)+(%dj)+(%dk)\n      (i,j,k����ʾ������\n",i,j,k,i,j,k);
}