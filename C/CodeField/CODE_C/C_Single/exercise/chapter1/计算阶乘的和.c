#include<stdio.h>
int f(int n){
    int ans=1;
    for(int i=1;i<=n;i++){
        ans*=i;
    }
    return ans;
}

int main(){
    int n;
    int sum=0;
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        sum+=f(i);
    }
    printf("%d\n",sum);
    return 0;
}