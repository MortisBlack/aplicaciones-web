export default class User {
    constructor(id, username, password, name, first_surname, second_surname, email, phone, img_profile, birthdate){
        this._id = id;
        this._username = username;
        this._password = password;
        this._name = name;
        this._first_surname = first_surname;
        this._second_surname = second_surname;
        this._email = email;
        this._phone = phone;
        this._img_profile = img_profile;        
        this._birthdate = birthdate;        
    }

    get id(){
        return this._id;
    }

    get username(){
        return this._username;
    }

    get password(){
        return this._password;
    }

    get name(){
        return this._name;
    }

    get first_surname(){

        return this._first_surname;
    }

    get second_surname(){
        return this._second_surname;
    }

    get email(){
        return this._email;
    }

    get phone(){

        return this._phone;
    }

    get img_profile(){

        return this._img_profile;
    }

    get birthdate(){
        return this._birthdate;
    }

    set id(id){
        this._id = id;
    }

    set username(username){
        if (username.length > 0 && username.length < 255 && username != undefined){
            this._username = username;
            return;
        }
        throw new Error("Username must be between 1 and 255 characters");
    }

    set password(password){
        if(password.length > 0 && password.length < 255 && password != undefined){
            this._password = password;
            return;
        }
        throw new Error("Password must be between 1 and 255 characters");
    }

    set name(name){
        if (name.length > 0 && name.length < 255 && name != undefined){
            this._name = name;
            return;
        }
        throw new Error("Name must be between 1 and 255 characters");
    }

    set first_surname(first_surname){
        if (first_surname.length > 0 && first_surname.length < 255 && first_surname != undefined){
            this._first_surname = first_surname;
            return;
        }
        throw new Error("First surname must be between 1 and 255 characters");
    }

    set second_surname(second_surname){
        if(second_surname === undefined){
            return;
        }

        if (second_surname.length < 255 && second_surname != undefined){
            this._second_surname = second_surname;
            return;
        }
        throw new Error("Second surname must be between 1 and 255 characters");
    }

    set email(email){
        if (email.length > 0 && email.length < 255 && email != undefined){
            this._email = email;
            return;
        }
        throw new Error("Email must be between 1 and 255 characters");
    }

    set phone(phone){
        if(phone === undefined){
            return;
        }
        if (phone.length <= 255 && phone != undefined){
            this._phone = phone;
            return;
        }
        throw new Error("Phone must be between 1 and 255 characters");
    }
    
    set img_profile(img_profile){
        if (img_profile.length > 0 && img_profile.length < 255 && img_profile != undefined){
            this._img_profile = img_profile;
            return;
        }
        throw new Error("Image profile must be between 1 and 255 characters");
    }

    set birthdate(birthdate){

        if(birthdate === undefined){
            return;
        }

        if (typeof birthdate == "Date"){
            this._birthdate = birthdate;
            return;
        }

        throw new Error("Birthdate must be a Date");
    }

    toPersistenceObject(){
        return {
            username: this._username,
            password: this._password,
            name: this._name,
            first_surname: this._first_surname,
            second_surname: this._second_surname,
            email: this._email,
            phone: this._phone,
            img_profile: this._img_profile,
            birthdate: this._birthdate
        }
    }

}