import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Expense } from './expense.js';
import { title } from 'process';

@Controller()
export class AppController {

  expenses: Expense[] = [
    {
      name: "Heti bevásárlás",
      amount: 18500,
      category: "food"
    },
    {
      name: "Villanyszámla",
      amount: 12400,
      category: "utilities"
    },
    {
      name: "Mozijegy",
      amount: 4200,
      category: "entertainment"
    },
    {
      name: "Új hátizsák",
      amount: 15900,
      category: "misc"
    },
    {
      name: "Ebéd étteremben",
      amount: 6800,
      category: "food"
    },
    {
      name: "Internet előfizetés",
      amount: 8900,
      category: "utilities"
    },
    {
      name: "Koncertjegy",
      amount: 12500,
      category: "entertainment"
    },
    {
      name: "Gyógyszertár",
      amount: 7350,
      category: "misc"
    },
    {
      name: "Pizza rendelés",
      amount: 5200,
      category: "food"
    },
    {
      name: "Vízszámla",
      amount: 6100,
      category: "utilities"
    },
    {
      name: "Videójáték",
      amount: 17900,
      category: "entertainment"
    },
    {
      name: "Írószerek",
      amount: 3200,
      category: "misc"
    }
  ];

  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render('index')
  getHello() {
    const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    return {
      total
    }
  }

  @Get("/all")
  @Render('all')
  getAllExpenses(){
    return{
      expenses: this.expenses,
      title: "All expense"
    }
  }

  @Get("/top3")
  @Render('all')
  getTop3(){
    const top3 = [...this.expenses]
    .sort((a, b) => b.amount - a.amount).slice(0, 3)

    return{
      title: "Top 3 kiadas",
      expenses: top3
    }
  }

  @Get("/search")
  @Render('search')
  search(@Query("name") name: string){
    const searchTerm = name?.toLowerCase() ?? "";

    const results = this.expenses.filter(expense => 
      expense.name.toLowerCase().includes(searchTerm)
    );

    return{
      title: "Kiadas keresese",
      expenses: results,
      searchTerm: name ?? ""
    }
  }

  @Get("/expensive")
  @Render('expensive')
  getExpensive(@Query("amount") amount?: string){
    const minAmount = Number(amount)

    const results = this.expenses.filter(
      expense => expense.amount > minAmount
    );

    return{
      title: "Dragakiadasok",
      expenses: results,
      amount: amount ?? ""
    }
  }



}
