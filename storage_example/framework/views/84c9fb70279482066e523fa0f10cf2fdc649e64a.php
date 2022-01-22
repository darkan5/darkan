<?php $__env->startSection('contentlms'); ?>

<h1 class="page-header"><i class="fa fa-users fa-fw"></i> <?=Lang::get("darkanpanel.page_name_users")?></h1>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Pliki do pobrania</span>
        <div class="btn-group pull-right">

        </div>
    </div>
    <div class="panel-body">
        <div>
            
            <?php echo Form::open(array('class' => 'form',  'method' => 'post', 'url' => 'lms/elearning/downloadfile/users')); ?>


                <input type="submit" name="file_type" value="csv" class="btn btn-success">
                <input type="submit" name="file_type" value="xls" class="btn btn-success">
                <input type="submit" name="file_type" value="json" class="btn btn-success">

            <?php echo Form::close(); ?>


        </div>
    </div>
 </div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <?=Lang::get("darkanpanel.panel_title_users_list")?>
        <div class="pull-right">
            <button class="btn btn-success open-add-new-user-window panel-button" data-toggle="modal" data-target="#add-new-user-window" >Utwórz nowego użytkownika</button>
            <button class="btn btn-success open-add-users-from-json-window panel-button" data-toggle="modal" data-target="#add-new-users-from-json-window" >Dodaj nowe konta użytkowników z JSON'a</button>
            <a href="<?php echo e(url('lms/elearning/groups')); ?>" class="btn btn-success">Utwórz nową grupę</a>
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        <div class="dataTable_wrapper">
            <table class="table table-responsive table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th><?=Lang::get("darkanpanel.table_column_mail")?></th>
                        <th><?=Lang::get("darkanpanel.table_column_groups")?></th>
                        <th>Utworzony</th>
                        <th><?=Lang::get("darkanpanel.table_column_options")?></th>
                    </tr>
                </thead>
                <tbody>

                    <?php $__currentLoopData = $usersList; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $user): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>

                        <tr>
                            <td><?php echo $key + 1; ?></td>

                            <td>

                                <div class="btn btn-default">
                                    <img style="border: 1px solid black; height: 20px;" src="<?php echo e(($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png')); ?> ">
                                    <a class="btn btn-warning btn-xs" title="<?php echo e($user->email); ?>" href="<?php echo e(url('/lms/elearning/user/') . '/' . $user->id); ?>"> <?php echo e($user->name); ?></a>
                                    <button class="btn btn-success btn-xs edit-user" user_id="<?php echo e($user->id); ?>" name="<?php echo e($user->name); ?>" email="<?php echo e($user->email); ?>" data-toggle="modal" data-target="#edit-user-window">E</button>
                                    <button class="btn btn-danger btn-xs delete-user" user_id="<?php echo e($user->id); ?>" data-toggle="modal" data-target="#delete-user-window">X</button>
                                </div>

                                
                            </td>

                            <td>

                                <?php if($user->groupUser): ?>

                                    <?php $__currentLoopData = $user->groupUser; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $groupUser): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>

                                        <?php 
                                            $lmsGroup = $groupUser->group;

                                            $groupContents = $lmsGroup->groupContents;

                                        ?>

                                        <div class="btn btn-default">
                                            <a class="btn btn-primary btn-xs" href="<?php echo e(url('/lms/elearning/group') . '/' . $lmsGroup->id); ?>"><?php echo e($lmsGroup->name); ?></a>
                                            
                                        
                                            <?php if($groupContents): ?>

                                                <?php $__currentLoopData = $groupContents; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $groupContent): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>

                                                    <?php 

                                                        $course = $groupContent->banner;
                                                     ?>


                                                    <a class="btn btn-info btn-xs" href="<?php echo e(url('/lms/publication') . '/' . $course->id_banner); ?>"><?php echo e($course->name); ?></a>
                                                <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>

                                                <button class="btn btn-danger btn-xs delete-user-from-group" user_id="<?php echo e($user->id); ?>" group_id="<?php echo e($lmsGroup->id); ?>" data-toggle="modal" data-target="#delete-user-from-group-window">X</button>
                                            <?php endif; ?>

                                        </div>

                                        

                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>

                                <?php endif; ?>

                                <button class="btn btn-success add-user-to-group" data-toggle="modal" data-target="#add-user-to-group-window" user_id="<?php echo e($user->id); ?>">+</button>

                            </td>
                            <td><?php echo e($user->created_at); ?></td>
                            <td>
                                
                                <button class="btn btn-success edit-user" user_id="<?php echo e($user->id); ?>" name="<?php echo e($user->name); ?>" email="<?php echo e($user->email); ?>" data-toggle="modal" data-target="#edit-user-window"><?=Lang::get('darkanpanel.btn_edit')?></button>
                                <button class="btn btn-danger delete-user" user_id="<?php echo e($user->id); ?>" data-toggle="modal" data-target="#delete-user-window"><?=Lang::get('darkanpanel.btn_delete')?></button>

                                <?php if($lmsInfo && $lmsInfo->lms_paid): ?>
                                   
                                    <?php if($user->payments->paid): ?>
                                    <button 
                                        class="btn btn-warning userpayment" 
                                        user_id="<?php echo e($user->id); ?>"
                                        >
                                        <?=Lang::get('darkanpanel.paymentDone')?>
                                    </button>
                                    <?php else: ?>
                                    <button 
                                        class="btn btn-info userpayment" 
                                        user_id="<?php echo e($user->id); ?>"
                                        data-toggle="modal" data-target="#markaspaid-user-window">
                                        <?=Lang::get('darkanpanel.setAsPaid')?>
                                    </button>
                                    <?php endif; ?>
                                <?php endif; ?>

                            </td>
                        
                        </tr>

                    <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>

                </tbody>
            </table>
        </div>
    </div>
    <!-- /.panel-body -->
</div>
<!-- /.panel -->

<div class="modal fade" id="add-user-to-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj użytkownika do grupy</h4>
            </div>

            <?php echo Form::open(array('class' => 'form', 'method' => 'post', 'url' => '/lms/elearning/groupuser')); ?>

            <?php echo Form::hidden('id_user', null); ?>


            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            <?php echo Form::label('Grupa'); ?>

                            <?php echo Form::select('id_group', $groupsArray, null, array('class' => 'form-control')); ?>

                        </div>
                    </div>

            </div>
            </div>
            <div class="modal-footer">
                <?php echo Form::submit('Ok', array('class'=>'btn btn-primary')); ?>

                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            <?php echo Form::close(); ?>

        </div>
    </div>
</div>

<div class="modal fade" id="delete-user-from-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika z grupy</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika z grupy?
            </div>
            <?php echo Form::open(array('class' => 'form', 'method' => 'delete', 'url' => '/lms/elearning/groupuser')); ?>

            <?php echo Form::hidden('id_user', null); ?>

            <?php echo Form::hidden('id_group', null); ?>

            <div class="modal-footer">
                <?php echo Form::submit('Ok', array('class'=>'btn btn-primary')); ?>

                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            <?php echo Form::close(); ?>

        </div>
    </div>
</div>

<div class="modal fade" id="add-new-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nowego użytkownika</h4>
            </div>

            <?php echo Form::open(array('class' => 'form', 'method' => 'post')); ?>

            <div class="modal-body">

                    <div class="form-group">
                        <?php echo Form::label('name', 'Nazwa', array('class' => 'control-label')); ?>

                        <?php echo Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')); ?>

                    </div>

                    <div class="form-group">
                        <?php echo Form::label('Email'); ?>

                        <?php echo Form::email('email', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')); ?>

                    </div>

                    <div class='form-group'>
                        <?php echo Form::label('password', 'Hasło'); ?>

                        <?php echo Form::password('password', ['placeholder' => 'Hasło', 'class' => 'form-control']); ?>

                    </div>
                    <div class='form-group'>
                        <?php echo Form::label('password_confirmation', 'Potwierdź hasło'); ?>

                        <?php echo Form::password('password_confirmation', ['placeholder' => 'Potwierdź hasło', 'class' => 'form-control']); ?>

                    </div>

            </div>
            <div class="modal-footer">
                <?php echo Form::submit('Ok', array('class'=>'btn btn-primary')); ?>

                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            <?php echo Form::close(); ?>

        </div>
    </div>
</div>

<div class="modal fade" id="add-new-users-from-json-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nowe konta użytkowników</h4>
            </div>

            <?php echo Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'lms/elearning/addnewuserfromjson')); ?>

            <div class="modal-body">

                <div class="form-group">
                        <?php echo Form::label('users_json', 'Przykład'); ?>

                        <?php echo Form::label('users_json', '[{ "name": "Jan Kowalski", "email" : "jan.kowalski@example.com.pl" },
                                                   { "name": "Maria Kowalska", "email" : "maria.kowalska@example.com.pl" }]'); ?>

                        <?php echo Form::label('users_json', 'Użytkownicy JSON'); ?>

                        <?php echo Form::textarea('users_json', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'')); ?>

                    </div>

                <div class="form-group">
                        <?php echo Form::label('group_id','Grupa'); ?>

                        <?php echo Form::select('group_id', $groupsArray, null, array('class' => 'form-control')); ?>

                    </div>

            </div>
            <div class="modal-footer">
                <?php echo Form::submit('Ok', array('class'=>'btn btn-primary')); ?>

                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            <?php echo Form::close(); ?>

        </div>
    </div>
</div>


<div class="modal fade" id="edit-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj użytkownika</h4>
            </div>

            <?php echo Form::open(array('class' => 'form', 'method' => 'put')); ?>

            <?php echo Form::hidden('user_id', null); ?>


            <div class="modal-body">

                    <div class="form-group">
                        <?php echo Form::label('name', 'Nazwa', array('class' => 'control-label')); ?>

                        <?php echo Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')); ?>

                    </div>

                    <div class="form-group">
                        <?php echo Form::label('Email'); ?>

                        <?php echo Form::email('email', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')); ?>

                    </div>

            </div>
            <div class="modal-footer">
                <?php echo Form::submit('Ok', array('class'=>'btn btn-primary')); ?>

                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            <?php echo Form::close(); ?>

        </div>
    </div>
</div>

<div class="modal fade" id="delete-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika?
            </div>
            <?php echo Form::open(array('class' => 'form', 'method' => 'delete')); ?>

            <?php echo Form::hidden('user_id', null); ?>

            <div class="modal-footer">
                <?php echo Form::submit('Ok', array('class'=>'btn btn-primary')); ?>

                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            <?php echo Form::close(); ?>

        </div>
    </div>
</div>

<script src="<?php echo e(asset('/js/lms/users.js')); ?>"></script>


<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.lms', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>