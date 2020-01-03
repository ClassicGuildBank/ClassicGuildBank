import { FormGroup, AbstractControl } from "@angular/forms";
import { IMoney } from "../models/guildbank/money.interface";

export function mustMatch( matchingControl: AbstractControl) {
    return (control: AbstractControl) => {

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            return { mustMatch: true };
        } 

        return null;
    }
  }

  export function passwordStrength() {
    return (control: AbstractControl) => {

        if(!control.value)
            return null;
            
        const pass = control.value.toString();
        if( pass.length < 8 )
            return {passwordStrength: true};

        const chars = pass.split('');

        if( chars.findIndex( c => c >= 'A' && c <= 'Z') == -1 )
            return {passwordStrength: true};
        
        if( chars.findIndex( c => c >= 'a' && c <= 'z') === -1 )
            return {passwordStrength: true};
        
        if( chars.findIndex( c=> c >= '0' && c <= '9') === -1 )
            return {passwordStrength: true};

        return null;
    }
  }

  export function maxGold(money: IMoney) {
    return (form: FormGroup) => {

        if(!form.value)
            return null;
        
        let gold = 0;

        if(form.value.gold) {
            gold = +form.value.gold * 10000;
        }

        if(form.value.silver) {
            gold += +form.value.silver * 100;
        }

        if(form.value.copper) {
            gold += +form.value.copper;
        }

        if( gold > money.gold) {
            return {maxGold: true};
        }

        return null;
    }
  }