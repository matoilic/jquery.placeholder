describe("jquery.placeholder", function() {
    var placeholder = 'foo bar', $element;
    
    function init(type) {
        $('form').html('<label for="field">L</label><input id="field" type="' + type + '" placeholder="' + placeholder + '">');
        $element = $('#field');
        $element.placeholder();
    }
    
    beforeEach(function() {
		init('text');
    });
    
    it("patches jQuery's val properly", function() {
        expect($element.val()).toEqual('');
        expect($element.realVal()).toEqual(placeholder);
        expect($element.val('other').val()).toEqual('other');
    });
    
    it("clears the field on focus", function() {
        expect($element.focus().realVal()).toEqual('');
    });
    
    it("restores the placeholder on unfocus", function() {
        expect($element.focus().blur().realVal()).toEqual(placeholder);
    });
    
    it("doesn't change user inputs", function() {
        expect($element.val('other').focus().realVal()).toEqual('other');
        expect($element.blur().realVal()).toEqual('other');
    });
    
	it("removes placeholder css class on focus", function() {
		expect($element.focus().hasClass('placeholder')).toBeFalsy();
	});
	
	it("adds placeholder css class on unfocus", function() {
		expect($element.focus().blur().hasClass('placeholder')).toBeTruthy();
	});
	
    it("clears placeholders when submitting the form", function() {
        var $form = $('form');
        $form.submit(function(e) { e.preventDefault(); }).submit();
        expect($element.realVal()).toEqual('');
    });
    
    it("changes password fields to text fields", function() {
        init('password');
        expect($('#field').prev().data('password')).toBeTruthy();
    });
    
    it("restores password fields", function() {
        init('password');
        $element.prev().focus();
        expect($element.prev('input').length).toEqual(0);
    });
    
    it("adjusts the label for password fields", function() {
       init('password');
       expect($('label[for=field-clone]').length).toEqual(1);
       $element.prev().focus();
       expect($('label[for=field]').length).toEqual(1);
    });
});