#include<stdio.h>
int a=3,b=5;
int main()
{
	int max(int a,int b);
	int a=8;
	printf("max=%d\n",max(a,b));
	return 0;
}
int max(int a,int b)//a，b为局部变量，仅对此函数
{
	int c;
	c=a>b?a:b;
	return(c);
}
//max=8  