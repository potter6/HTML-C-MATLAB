/*完数就是该数恰好等于除自身外的因子之和。
例如：6=1+2+3，其中1、2、3为6的因子。*/
#include <stdio.h>

int factorsum( int number )
{
    if(number <= 1) return 0;
    int sum = 0;
    for(int i = 1;i<number;i++)
    {
        if(number%i == 0)
            sum += i;
    }
    return sum;
}
    
    
void PrintPN( int m, int n )
{
    int flag = 0,tmp = 0;
    for(int number = m;number <= n;number++)
    {
        if(factorsum(number) == number)
        {
            flag = 1;
            printf("%d =",number);
            tmp = 0;
            for(int i = 1;i<number;i++)
            {
                if(number%i == 0)
                {
                    printf(" %d",i);
                    tmp += i;
                if(tmp == number)
                {
                    printf("\n");
                }
                else
                {
                    printf(" +");
                }
                }
            }
        }
    }
    if(flag == 0)
    {
        printf("No perfect number");
    }
}
int main()
{
    int m, n;

    scanf("%d %d", &m, &n);
    if ( factorsum(m) == m ) printf("%d is a perfect number\n", m);
    if ( factorsum(n) == n ) printf("%d is a perfect number\n", n);
    PrintPN(m, n);

    return 0;
}
/*输入样例1：

6 30

输出样例1：

6 is a perfect number
6 = 1 + 2 + 3
28 = 1 + 2 + 4 + 7 + 14

输入样例2：

7 25

输出样例2：

No perfect number*/