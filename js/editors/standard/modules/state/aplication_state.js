var State = function(){
	
}

State.NORMAL = 'normal';
State.BASIC = 'basic';
State.TESTDRIVE = 'test-drive';

State.detect = function(){

	if(__meta__.projectID == 0){
		this.state = State.TESTDRIVE;
	}else{
		this.state = State.NORMAL;
	}

	//this.state = 'test-drive'; //normal, basic, test-drive
}  

State.getStateType = function(state){
	this.state = state;
} 

State.getStateType = function(){
	return this.state;
} 

State.isTestDrive = function(){
	return this.state == State.TESTDRIVE ? true : false;
} 



State.detect();  