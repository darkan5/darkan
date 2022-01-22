<?php $__env->startSection('content'); ?>

<div class="topmenu-offset"></div>

<ul>
    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
        <div class="bs-example col-md-10 col-md-offset-1">
            <div class="alert alert-warning">
                <a href="#" class="close" data-dismiss="alert">&times;</a>
                <strong>Uwaga!</strong> <?php echo e($error); ?>

            </div>
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>
</ul>

<div class="container-fluid">
    <div class="col-md-12">
        <div class="panel panel-primary">
            <div class="panel-heading panel-big">
                <span>Użytkownicy</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-user-window" data-toggle="modal" data-target="#add-new-user-window">Dodaj nowego użytkownika</button>
                </div>
            </div>
            <div class="panel-body">

                <div>Kliknij użytkownika i przejmij jego rolę</div>
                <br>

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nazwa</th>
                            <th>Email</th>
                            <th>Rola</th>
                            <th>Utworzony</th>
                            <th>Edytowany</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $__currentLoopData = $users; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $user): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>

                        <tr>
                            <td><?php echo $key + 1; ?></td>
                            <td>
                                <a href="<?php echo e(url('admin/loginas')); ?>/<?php echo e($user->id); ?>">
                                    <?php echo e($user->name); ?>

                                </a>
                            </td>
                            <td><?php echo e($user->email); ?></td>
                            <td><?php echo e($user->role_name); ?></td>
                            <td><?php echo e($user->created_at); ?></td>
                            <td><?php echo e($user->updated_at); ?></td>
                            <td>

                                <button class="btn btn-primary edit-user" data-toggle="modal" data-target="#edit-user-window" 
                                            user_id="<?php echo e($user->id); ?>"
                                            name="<?php echo e($user->name); ?>"
                                            email="<?php echo e($user->email); ?>"
                                            role_id="<?php echo e($user->role_id); ?>">
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-user" data-toggle="modal" data-target="#delete-user-window" 
                                                    user_id="<?php echo e($user->id); ?>">
                                                    Usuń
                                </button>

                                <a href="<?php echo e(url('admin/userplanslist') . '/' . $user->id); ?>" class="btn btn-success">Plany</a>

                                <a href="<?php echo e(url('admin/user') . '/' . $user->id); ?>" class="btn btn-warning">Szczegóły</a>

                            </td>
                        </tr>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>
                    </tbody>
                </table>
            </div>
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

                    <div class="form-group">
                        <?php echo Form::label('Rola'); ?>

                        <?php echo Form::select('role_id', $createRolesList, null, array('class' => 'form-control')); ?>

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

                    <div class="form-group">
                        <?php echo Form::label('Rola'); ?>

                        <?php echo Form::select('role_id', $rolesList, null, array('class' => 'form-control')); ?>

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

<script src="<?php echo e(asset('/js/users_list.js')); ?>"></script>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>