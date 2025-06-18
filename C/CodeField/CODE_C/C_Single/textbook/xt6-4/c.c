#include<stdio.h>

    // int fib( int n )
    // {
    //     if()
    //     {
    //         printf("%d",);
    //     }
    //     return n;
    // }
    // void PrintFN( int m, int n )
	// {
    //     for (int i = m; i <= n; i++)
    //     {
    //         if(i==((i-1)+(i-2)))
    //         {
    //             printf("%d ",i);
    //         }
    //         else{
    //             printf("No Fibonacci number");
    //         }
    //     }
        
    // }
    int fib( int n )
    {
        if(n <= 2) return 1;
        int f1=1,f2=1,f3=0;
        for(int i = 3;i <= n;i++)
        {
            f3 = f2 + f1;
            f1 = f2;
            f2 = f3;
        }
        return f3;
    }

void PrintFN( int m, int n )
{
    int flag = 0,i = 1,tmp = fib(i);
    while(tmp <= n)
    {
        if(tmp >= m)
        {
            printf("%d",tmp);
            flag = 1;
            if(fib(i+1) <= n)
            {
                printf(" ");
            }
            else
            {
                printf("\n");
            }
        }
        tmp = fib(++i);
    }
    if(flag == 0) printf("No Fibonacci number");
}
int main()
{
    int m, n, t;

    scanf("%d %d %d", &m, &n, &t);
    printf("fib(%d) = %d\n", t, fib(t));
    PrintFN(m, n);

    return 0;
}
// 输入样例1：

// 20 100 7

// 输出样例1：

// fib(7) = 13

// 21 34 55 89

// 输入样例2：

// 2000 2500 8

// 输出样例2：

// fib(8) = 21

// No Fibonacci number

//其中函数fib须返回第n项Fibonacci数；
//函数PrintFN要在一行中输出给定范围[m, n]内的
//所有Fibonacci数，相邻数字间有一个空格，
//行末不得有多余空格。
//如果给定区间内没有Fibonacci数，
//则输出一行“No Fibonacci number”。


//Fibonacci数列就是满足任一项数字是前两项的和
//（最开始两项均定义为1）的数列。
//本题要求实现一个计算Fibonacci数的简单函数，
//并利用其实现另一个函数，
//输出两正整数m和n（0<m≤n≤10000）
//之间的所有Fibonacci数。






