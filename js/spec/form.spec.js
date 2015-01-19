describe("Form", function(){

    it('track that init method was called on validateForm.create', function(){
        spyOn(validateForm, 'init').and.callThrough();
        var items = {items:["item1", "item2"]};
        var form = validateForm.create(items);

        expect(validateForm.init).toHaveBeenCalledWith(items);
    });
    it('track that isValid method was called for all arguments', function(){
        spyOn(validateForm, 'isValid').and.callThrough();
        var items = {items:["item1", "item2"]};
        var form = validateForm.create(items);

        expect(validateForm.isValid).toHaveBeenCalled();
        expect(validateForm.isValid.calls.count()).toEqual(2);
    });

    it('isValid works great for "OnlyLetters" parameter', function(){
        var form = validateForm.create({items:["item1", "item2"]});

        expect(validateForm.isValid("OnlyLetters", "123")).not.toBe(true);
        expect(validateForm.isValid("OnlyLetters", "abcd123")).not.toBe(true);
        expect(validateForm.isValid("OnlyLetters", "abcd 123 erf")).not.toBe(true);
        expect(validateForm.isValid("OnlyLetters", "abcd . - _ , erf")).not.toBe(true);

        expect(validateForm.isValid("OnlyLetters", "abcd")).toBeTruthy();
        expect(validateForm.isValid("OnlyLetters", "abcd erf")).toBeTruthy();
    });

    it('isValid works great for "Email" parameter', function(){
        var form = validateForm.create({items:["item1", "item2"]});

        expect(validateForm.isValid("Email", "123")).not.toBe(true);
        expect(validateForm.isValid("Email", "abcd123@")).not.toBe(true);
        expect(validateForm.isValid("Email", "abcd 123 erf@gmail.com")).not.toBe(true);
        expect(validateForm.isValid("Email", "abcd*gra@erf.pl")).not.toBe(true);
        expect(validateForm.isValid("Email", "abcdgra@erf.")).not.toBe(true);
        expect(validateForm.isValid("Email", "_abcdgra@erf.pl")).not.toBe(true);

        expect(validateForm.isValid("Email", "abcd@gmail.com")).toBeTruthy();
        expect(validateForm.isValid("Email", "abcd-gmh@o2.pl")).toBeTruthy();
        expect(validateForm.isValid("Email", "abcd.gmh@o2.pl")).toBeTruthy();
        expect(validateForm.isValid("Email", "abcd_gmh@o2.pl")).toBeTruthy();
    });

    it('isValid works great for "Website" parameter', function(){
        var form = validateForm.create({items:["item1", "item2"]});

        expect(validateForm.isValid("Website", "ftps://foo.bar/")).not.toBe(true);
        expect(validateForm.isValid("Website", "abcd")).not.toBe(true);

        expect(validateForm.isValid("Website", "http://google.pl")).toBeTruthy();
        expect(validateForm.isValid("Website", "http://www.googleeee.pl")).toBeTruthy();

    });
});