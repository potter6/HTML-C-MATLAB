#include <stdio.h>

int max( int a, int b )
{
    if(a>=b)
    return a;
    else 
    return b;
}
int main()
{    
    int a, b;

    scanf("%d %d", &a, &b);
    printf("max = %d\n", max(a, b));

    return 0;
}