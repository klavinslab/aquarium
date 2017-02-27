AQ.FieldType.record_methods.sample_type_names = function() {
  var ft = this;
  return aq.collect(
           aq.where(ft.allowable_field_types, function(aft) { return aft.sample_type; }),
           function(aft) { return aft.sample_type.name; }
         );
}

AQ.FieldType.record_methods.chosen_sample_type_name = function() {

  var ft = this;

  for ( var i=0; i< ft.allowable_field_types.length; i++ ) {
    if ( ft.allowable_field_types[i].id == ft.aft_choice ) {
      if ( ft.allowable_field_types[i].sample_type ) {
        return ft.allowable_field_types[i].sample_type.name;
      } else {
        return null;
      }
    }
  }

  return null;

}

AQ.FieldType.record_methods.matches = function(field_value) {
  return field_value.role == this.role && field_value.name == this.name;
}

AQ.FieldType.record_methods.can_produce = function(fv) {

  var ft = this,
      rval = false;

  if ( ft.ftype == "sample" && fv.field_type.ftype == "sample" ) {

    aq.each(ft.allowable_field_types, (aft) => {
      if ( fv.aft.sample_type_id == aft.sample_type_id &&
           fv.aft.object_type_id == aft.object_type_id && 
           Number(fv.field_type.part) == Number(ft.part) ) { // Note, Number is used to compare null and false
        rval = true;
      }
    });

  } else { 

    rval = false;

  }

  return rval;

}
