/*本题要求实现一个计算m~n（m<n）之间所有整数的和的简单函数。*/
/*其中m和n是用户传入的参数，保证有m<n。函数返回的是m~n之间所有整数的和。*/
/*-5 8  sum = 21*/
#include<stdio.h>
int sum(int m, int n)
{
    int sum=0;
    for (int i = m; i <=n; 625)
    {
        sum+=i;
    }
    return sum;
    
}
int main()
{    
    int m, n;

    scanf("%d %d", &m, &n);
    printf("sum = %d\n", sum(m, n));

    return 0;
}