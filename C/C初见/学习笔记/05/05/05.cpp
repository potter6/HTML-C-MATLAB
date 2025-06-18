#include<stdio.h>

void main()
{
	int a=15;
	float b=123.1234567;
	double c=12345678.1234567;
	char d='p';
	printf("a=%d,%5d,%o,%x\n",a,a,a,a);
	printf("b=%f,%lf,%5.4lf,%e\n",b,b,b,b);
	printf("c=%lf,%f,%8.4lf\n",c,c,c);
	printf("d=%c,%8c\n",d,d);
	
	int i=8;
	printf("%d\n%d\n%d\n%d\n%d\n%d\n",++i,--i,i++,i--,-i++,-i--);
	//8 8 7 8 -7 -8 //
	//int i=8;
	//printf("%d\n",++i);
	//printf("%d\n",--i);
    //printf("%d\n",i++);
    //printf("%d\n",i--);
	//printf("%d\n",-i++);
	//printf("%d\n",-i--);//9,8,8,9,-8,-9//
}