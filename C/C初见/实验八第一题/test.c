#include<stdio.h>
#define N 4
struct student
{
	int num;
	char name[20];
	int age;
	char sex;
};
int main()
{
	void stat(struct student stu[]);
	void print(struct student stu);
	struct student stu[N], * p = stu;
	input(p);
	return 0;
}

void input(struct student stu[])
{
	int i;
	for (i = 0; i < N; i++)
	{
		scanf_s("%d%s%d%s", &stu[i].num, stu[i].name, &stu[i].age, stu[i].sex);
	}
}
void stat(struct student stu[])
{
	char M, F;
	int i, m = 0, w = 0, x = 0;
	for (i = 0; i < N; i++)
	{
		if (stu[i].age < 18)x++;
		if (stu[i].sex = M)m++;
		if (stu[i].sex = F)w++;
	}
	printf("num  name  age  sex\n");
	for (i = 0; i < N; i++)
	{
		printf("%d%s%d%s", &stu[i].num, stu[i].name, &stu[i].age, stu[i].sex);
     }