(function() {
    'use strict';

    angular
        .module('labratApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('device-my-suffix', {
            parent: 'entity',
            url: '/device-my-suffix?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'labratApp.device.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/device/devicesmySuffix.html',
                    controller: 'DeviceMySuffixController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('device');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('device-my-suffix-detail', {
            parent: 'device-my-suffix',
            url: '/device-my-suffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'labratApp.device.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/device/device-my-suffix-detail.html',
                    controller: 'DeviceMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('device');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Device', function($stateParams, Device) {
                    return Device.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'device-my-suffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('device-my-suffix-detail.edit', {
            parent: 'device-my-suffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/device-my-suffix-dialog.html',
                    controller: 'DeviceMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Device', function(Device) {
                            return Device.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('device-my-suffix.new', {
            parent: 'device-my-suffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/device-my-suffix-dialog.html',
                    controller: 'DeviceMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                manufacture: null,
                                model: null,
                                apiUserId: null,
                                apiUriPrefix: null,
                                apiToken: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('device-my-suffix', null, { reload: 'device-my-suffix' });
                }, function() {
                    $state.go('device-my-suffix');
                });
            }]
        })
        .state('device-my-suffix.edit', {
            parent: 'device-my-suffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/device-my-suffix-dialog.html',
                    controller: 'DeviceMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Device', function(Device) {
                            return Device.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('device-my-suffix', null, { reload: 'device-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('device-my-suffix.delete', {
            parent: 'device-my-suffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/device-my-suffix-delete-dialog.html',
                    controller: 'DeviceMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Device', function(Device) {
                            return Device.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('device-my-suffix', null, { reload: 'device-my-suffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
