/*使用函数求素数和*/
/*
输入样例：-1 10
输出样例：Sum of ( 2 3 5 7 ) = 17
*/
#include <stdio.h>
#include <math.h>

int prime(int p)
{
    if (p < 2)
        return 0;
    for (int i = 2; i * i <= p; i++)
    {
        if (p % i == 0)
            return 0;
    }
    return 1;
}
int PrimeSum(int m, int n)
{
    int sum = 0;
    for (int i = m; i <= n; i++)
    {
        if (prime(i))
            sum += i;
    }

    return sum;
}

int main()
{
    int m, n, p;

    scanf("%d %d", &m, &n);
    printf("Sum of ( ");
    for (p = m; p <= n; p++)
    {
        if (prime(p) != 0)
            printf("%d ", p);
    }
    printf(") = %d\n", PrimeSum(m, n));

    return 0;
}
