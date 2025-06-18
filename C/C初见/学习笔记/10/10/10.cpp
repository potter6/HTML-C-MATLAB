#include<stdio.h>
void main()
{
	int a,b;
	scanf("%5d%*d%d",&a,&b);
	printf("a=%d,b=%d",a,b);
}
//"*"符，用以表示该输入项，读入
//后不赋予相应的变量，即跳过该输入值