class SortedList {
    constructor(){
        this.items = [];
        this.size = 0;
    }

    add(element){
        this.items.push(element);
        this.size++;
        this.items.sort((a,b) => a-b);

    }
       remove(index) {
           if (index >= 0 && index < this.items.length) {
               this.items.splice(index, 1);
               this.size--;
           }
       }

       get(index){
           if(index>= 0 && index<this.items.length){
               return this.items[index];
           }
       }

}