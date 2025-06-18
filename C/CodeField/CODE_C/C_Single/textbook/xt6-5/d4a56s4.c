 #include <stdio.h>
 #include <math.h>
 
int prime( int p )
{
    if(p<2) return 0;
    for(int i = 2;i*i<=p;i++)
    {
        if(p%i==0)return 0;
    }
    return 1;
}
void Goldbach( int n )
{
    for(int i = 3;2*i<=n;i+=2)
    {
        if(prime(i)&&prime(n-i))
        {
            printf("%d=%d+%d",n,i,n-i);
            return;
        }
    }
}
 
 int main() 
 {
     int m, n, i, cnt;
 
     scanf("%d %d", &m, &n);
     if ( prime(m) != 0 ) printf("%d is a prime number\n", m);
     if ( m < 6 ) m = 6;
    if ( m%2 ) m++;
     cnt = 0;
     for( i=m; i<=n; i+=2 ) {
         Goldbach(i);
         cnt++;//每输出5个算式就换行
         if ( cnt%5 ) printf(", ");
         else printf("\n");
     }
 
     return 0; 
}




