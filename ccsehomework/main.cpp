  //二叉树 前序和中序得到后序
#include "stdio.h"
  typedef struct node
  {
      int key;
      struct node *left;
      struct node *right;
  }treeNode;
  
 int pre_order[100];
 int mid_order[100];
 
 treeNode* construct_post_order(int pre_l, int pre_r, int mid_l, int mid_r)
 {
     if (pre_r - pre_l < 0)
     {
         return NULL;
     }
     treeNode *root;
     root = new treeNode;
     root->key = pre_order[pre_l];
     if (pre_r == pre_l)
     {
         root->left = NULL;
         root->right = NULL;
         return root;
     }
     int index;
     for (index = mid_l; index <= mid_r; index++)
     {
         if (mid_order[index] == pre_order[pre_l])
             break;
     }
     root->left = construct_post_order(pre_l+1, pre_l+(index-mid_l), mid_l, index-1);
     root->right = construct_post_order(pre_l+(index-mid_l)+1, pre_r, index+1, mid_r);
     return root;
 }
 
 void post_Order(treeNode *root)
 {
     if(root != NULL)
     {
         post_Order(root->left);
         post_Order(root->right);
         printf("%d ", root->key);
     }
 }
 
 int main()
 {
     int n;
     printf("输入序列的长度\n");
     scanf("%d", &n);
     printf("输入二叉树前序\n");
     for (int i = 0; i < n; i++)
         scanf("%d", &pre_order[i]);
     printf("输入二叉树中序\n");
     for (int i = 0; i < n; i++)
         scanf("%d", &mid_order[i]);
     treeNode *root = construct_post_order(0, n-1, 0, n-1);
     printf("二叉树的后序为\n");
     post_Order(root);
     printf("\n");
     scanf("%d", &n);
 
     return 0;
 }