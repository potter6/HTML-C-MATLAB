
#include<stdio.h>
int main()
{
	int a[20],i;
	for(i=0;i<20;i++)
		scanf("%d",&a[i]);
	for(i=19;i>=0;i--)
		printf("%d ",a[i]);
	return 0;
}