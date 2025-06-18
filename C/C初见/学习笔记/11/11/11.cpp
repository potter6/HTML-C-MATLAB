#include<stdio.h>
void main()
{
	int i;
	double a=1.4;
	double sum=0;
	for(i=1;i<=100;i++)
	{
		sum+=a;
		a+=1.2; 
	}
	printf("sum=%f\n",sum);
	
}