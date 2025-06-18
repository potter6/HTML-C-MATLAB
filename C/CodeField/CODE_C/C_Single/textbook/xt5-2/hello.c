#include <stdio.h>
/*输入样例：6
2 -3 7 88 0 15
输出样例：Sum of ( -3 7 15 ) = 19*/
#define MAXN 10

int even(int n)
{
    return (n+1)%2;
}
int OddSum(int List[], int N)
{
    int s=0;
    for (int i = 0; i <N; i++)
    {
        if (!even(List[i]))
        s+=List[i];
    }
    return s;
}
int main()
{
    int List[MAXN], N, i;

    scanf("%d", &N);
    printf("Sum of ( ");
    for (i = 0; i < N; i++)
    {
        scanf("%d", &List[i]);
        if (even(List[i]) == 0)
            printf("%d ", List[i]);
    }
    printf(") = %d\n", OddSum(List, N));

    return 0;
}